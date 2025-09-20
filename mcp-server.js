#!/usr/bin/env node

/**
 * MCP Server for Metal Shows Obsidian Vault
 * Provides semantic search and context for show and people notes
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');
const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

class MetalShowsServer {
  constructor() {
    this.server = new Server(
      {
        name: 'metal-shows-vault',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.vaultPath = process.env.VAULT_PATH || path.join(__dirname, 'vault');
    this.setupHandlers();
  }

  setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'search_shows',
          description: 'Search for shows by date, venue, bands, or people',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query (e.g., "drummers", "The Underworld", "September 2025")',
              },
              type: {
                type: 'string',
                enum: ['date', 'venue', 'band', 'person', 'all'],
                description: 'Type of search to perform',
                default: 'all',
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'search_people',
          description: 'Search for people by name, band role, or shows attended',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query (e.g., "drummer", "Void Serpent", "Sarah")',
              },
              filter: {
                type: 'string',
                enum: ['musicians', 'venue_staff', 'all'],
                description: 'Filter by person type',
                default: 'all',
              },
            },
            required: ['query'],
          },
        },
        {
          name: 'find_connections',
          description: 'Find connections between people, shows, and bands',
          inputSchema: {
            type: 'object',
            properties: {
              entity: {
                type: 'string',
                description: 'Name of person, band, or venue to find connections for',
              },
              depth: {
                type: 'number',
                description: 'Depth of connections to explore (1-3)',
                default: 1,
                minimum: 1,
                maximum: 3,
              },
            },
            required: ['entity'],
          },
        },
        {
          name: 'get_stats',
          description: 'Get statistics about shows and people',
          inputSchema: {
            type: 'object',
            properties: {
              category: {
                type: 'string',
                enum: ['shows', 'people', 'venues', 'bands', 'all'],
                description: 'Category to get stats for',
                default: 'all',
              },
            },
          },
        },
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'search_shows':
          return await this.searchShows(args);
        case 'search_people':
          return await this.searchPeople(args);
        case 'find_connections':
          return await this.findConnections(args);
        case 'get_stats':
          return await this.getStats(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  async searchShows({ query, type = 'all' }) {
    const showsPath = path.join(this.vaultPath, 'Shows');
    const files = await fs.readdir(showsPath);
    const results = [];

    for (const file of files) {
      if (!file.endsWith('.md')) continue;

      const content = await fs.readFile(path.join(showsPath, file), 'utf-8');
      const { data: frontmatter, content: body } = matter(content);

      let matches = false;
      const queryLower = query.toLowerCase();

      switch (type) {
        case 'date':
          if (frontmatter.date && frontmatter.date.includes(query)) {
            matches = true;
          }
          break;
        case 'venue':
          if (frontmatter.venue && frontmatter.venue.toLowerCase().includes(queryLower)) {
            matches = true;
          }
          break;
        case 'band':
          if (frontmatter.bands) {
            const bandNames = frontmatter.bands.map(b =>
              (b.headliner || b.opener1 || b.opener2 || '').toLowerCase()
            );
            if (bandNames.some(name => name.includes(queryLower))) {
              matches = true;
            }
          }
          break;
        case 'person':
          if (frontmatter.people_met) {
            const peopleStr = frontmatter.people_met.join(' ').toLowerCase();
            if (peopleStr.includes(queryLower)) {
              matches = true;
            }
          }
          break;
        case 'all':
        default:
          const fullContent = JSON.stringify(frontmatter) + ' ' + body;
          if (fullContent.toLowerCase().includes(queryLower)) {
            matches = true;
          }
          break;
      }

      if (matches) {
        results.push({
          file: file,
          date: frontmatter.date,
          venue: frontmatter.venue,
          bands: frontmatter.bands,
          people: frontmatter.people_met,
          excerpt: body.substring(0, 200) + '...',
        });
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              query,
              type,
              results: results.sort((a, b) => (b.date || '').localeCompare(a.date || '')),
              count: results.length,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  async searchPeople({ query, filter = 'all' }) {
    const peoplePath = path.join(this.vaultPath, 'People');
    const files = await fs.readdir(peoplePath);
    const results = [];

    for (const file of files) {
      if (!file.endsWith('.md')) continue;

      const content = await fs.readFile(path.join(peoplePath, file), 'utf-8');
      const { data: frontmatter, content: body } = matter(content);

      const queryLower = query.toLowerCase();
      const fullContent = JSON.stringify(frontmatter) + ' ' + body;

      if (fullContent.toLowerCase().includes(queryLower)) {
        // Apply filter
        if (filter === 'musicians' && !frontmatter.band_role) continue;
        if (filter === 'venue_staff' && !frontmatter.tags?.includes('venue-staff')) continue;

        results.push({
          name: frontmatter.name || file.replace('.md', ''),
          band_role: frontmatter.band_role,
          first_met: frontmatter.first_met,
          shows_attended: frontmatter.shows_attended,
          social_handles: frontmatter.social_handles,
        });
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              query,
              filter,
              results,
              count: results.length,
            },
            null,
            2
          ),
        },
      ],
    };
  }

  async findConnections({ entity, depth = 1 }) {
    const connections = {
      shows: [],
      people: [],
      bands: [],
      venues: [],
    };

    // Search in shows
    const showsPath = path.join(this.vaultPath, 'Shows');
    const showFiles = await fs.readdir(showsPath);

    for (const file of showFiles) {
      if (!file.endsWith('.md')) continue;

      const content = await fs.readFile(path.join(showsPath, file), 'utf-8');
      const { data: frontmatter, content: body } = matter(content);
      const fullContent = JSON.stringify(frontmatter) + ' ' + body;

      if (fullContent.includes(entity)) {
        connections.shows.push({
          file,
          date: frontmatter.date,
          venue: frontmatter.venue,
        });

        // Add connected people
        if (frontmatter.people_met) {
          frontmatter.people_met.forEach(person => {
            const cleanName = person.replace(/\[\[|\]\]/g, '');
            if (!connections.people.includes(cleanName) && cleanName !== entity) {
              connections.people.push(cleanName);
            }
          });
        }

        // Add connected bands
        if (frontmatter.bands) {
          frontmatter.bands.forEach(band => {
            const bandName = band.headliner || band.opener1 || band.opener2;
            if (bandName && !connections.bands.includes(bandName)) {
              connections.bands.push(bandName);
            }
          });
        }

        // Add venue
        if (frontmatter.venue && !connections.venues.includes(frontmatter.venue)) {
          connections.venues.push(frontmatter.venue);
        }
      }
    }

    // Search in people (if depth > 1)
    if (depth > 1) {
      const peoplePath = path.join(this.vaultPath, 'People');
      const peopleFiles = await fs.readdir(peoplePath);

      for (const file of peopleFiles) {
        if (!file.endsWith('.md')) continue;

        const content = await fs.readFile(path.join(peoplePath, file), 'utf-8');
        const { data: frontmatter } = matter(content);

        if (frontmatter.shows_attended) {
          const attendedShows = frontmatter.shows_attended.join(' ');
          if (attendedShows.includes(entity)) {
            const personName = frontmatter.name || file.replace('.md', '');
            if (!connections.people.includes(personName)) {
              connections.people.push(personName);
            }
          }
        }
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              entity,
              depth,
              connections,
              total: Object.values(connections).reduce((sum, arr) => sum + arr.length, 0),
            },
            null,
            2
          ),
        },
      ],
    };
  }

  async getStats({ category = 'all' }) {
    const stats = {};

    if (category === 'shows' || category === 'all') {
      const showsPath = path.join(this.vaultPath, 'Shows');
      const showFiles = await fs.readdir(showsPath);
      const shows = showFiles.filter(f => f.endsWith('.md'));

      stats.shows = {
        total: shows.length,
        files: shows,
      };
    }

    if (category === 'people' || category === 'all') {
      const peoplePath = path.join(this.vaultPath, 'People');
      const peopleFiles = await fs.readdir(peoplePath);
      const people = peopleFiles.filter(f => f.endsWith('.md'));

      stats.people = {
        total: people.length,
        files: people,
      };
    }

    if (category === 'venues' || category === 'all') {
      const venues = new Set();
      const showsPath = path.join(this.vaultPath, 'Shows');
      const showFiles = await fs.readdir(showsPath);

      for (const file of showFiles) {
        if (!file.endsWith('.md')) continue;
        const content = await fs.readFile(path.join(showsPath, file), 'utf-8');
        const { data: frontmatter } = matter(content);
        if (frontmatter.venue) {
          venues.add(frontmatter.venue);
        }
      }

      stats.venues = {
        total: venues.size,
        list: Array.from(venues),
      };
    }

    if (category === 'bands' || category === 'all') {
      const bands = new Set();
      const showsPath = path.join(this.vaultPath, 'Shows');
      const showFiles = await fs.readdir(showsPath);

      for (const file of showFiles) {
        if (!file.endsWith('.md')) continue;
        const content = await fs.readFile(path.join(showsPath, file), 'utf-8');
        const { data: frontmatter } = matter(content);
        if (frontmatter.bands) {
          frontmatter.bands.forEach(band => {
            const name = band.headliner || band.opener1 || band.opener2;
            if (name) bands.add(name);
          });
        }
      }

      stats.bands = {
        total: bands.size,
        list: Array.from(bands),
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(stats, null, 2),
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Metal Shows MCP Server running...');
  }
}

// Run the server
const server = new MetalShowsServer();
server.run().catch(console.error);