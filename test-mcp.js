#!/usr/bin/env node

/**
 * Test script for Metal Shows MCP Server
 * Run with: node test-mcp.js
 */

const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');
const { spawn } = require('child_process');

async function testMCPServer() {
  console.log('🧪 Testing Metal Shows MCP Server...\n');

  // Create transport for testing
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [__dirname + '/mcp-server.js'],
    env: {
      ...process.env,
      VAULT_PATH: __dirname + '/vault',
    },
  });

  const client = new Client(
    {
      name: 'test-client',
      version: '1.0.0',
    },
    {
      capabilities: {},
    }
  );

  try {
    // Connect to server
    await client.connect(transport);
    console.log('✅ Connected to MCP server\n');

    // List available tools
    const tools = await client.listTools();
    console.log('📋 Available tools:');
    tools.tools.forEach(tool => {
      console.log(`  - ${tool.name}: ${tool.description}`);
    });
    console.log();

    // Test 1: Search for shows with drummers
    console.log('🔍 Test 1: Search for shows with drummers');
    const drummerSearch = await client.callTool('search_shows', {
      query: 'drummer',
      type: 'all',
    });
    console.log('Results:', JSON.parse(drummerSearch.content[0].text).count, 'shows found\n');

    // Test 2: Search for people from bands
    console.log('🔍 Test 2: Search for musicians');
    const musicianSearch = await client.callTool('search_people', {
      query: 'band',
      filter: 'musicians',
    });
    console.log('Results:', JSON.parse(musicianSearch.content[0].text).count, 'musicians found\n');

    // Test 3: Find connections for a venue
    console.log('🔍 Test 3: Find connections for The Underworld');
    const connections = await client.callTool('find_connections', {
      entity: 'The Underworld',
      depth: 1,
    });
    const connData = JSON.parse(connections.content[0].text);
    console.log('Connections found:');
    console.log('  - Shows:', connData.connections.shows.length);
    console.log('  - People:', connData.connections.people.length);
    console.log('  - Bands:', connData.connections.bands.length);
    console.log();

    // Test 4: Get statistics
    console.log('📊 Test 4: Get vault statistics');
    const stats = await client.callTool('get_stats', {
      category: 'all',
    });
    const statsData = JSON.parse(stats.content[0].text);
    console.log('Vault statistics:');
    console.log('  - Total shows:', statsData.shows?.total || 0);
    console.log('  - Total people:', statsData.people?.total || 0);
    console.log('  - Unique venues:', statsData.venues?.total || 0);
    console.log('  - Unique bands:', statsData.bands?.total || 0);
    console.log();

    // Test 5: Semantic search examples
    console.log('🎯 Test 5: Semantic search examples\n');

    // Search for shows in September
    const septShows = await client.callTool('search_shows', {
      query: '2025-09',
      type: 'date',
    });
    console.log('Shows in September 2025:', JSON.parse(septShows.content[0].text).count);

    // Search for venues
    const venueSearch = await client.callTool('search_shows', {
      query: 'Whisky',
      type: 'venue',
    });
    console.log('Shows at The Whisky:', JSON.parse(venueSearch.content[0].text).count);

    // Search for specific bands
    const bandSearch = await client.callTool('search_shows', {
      query: 'Void Serpent',
      type: 'band',
    });
    console.log('Shows with Void Serpent:', JSON.parse(bandSearch.content[0].text).count);

    console.log('\n✅ All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    // Cleanup
    await client.close();
    process.exit(0);
  }
}

// Run tests
testMCPServer().catch(console.error);