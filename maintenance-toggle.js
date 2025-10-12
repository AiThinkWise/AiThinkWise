/**
 * AiThinkWise Maintenance Mode Toggle
 * 
 * This script helps you easily switch between maintenance mode and normal mode
 * during DNS propagation or other maintenance situations.
 */

// Configuration
const MAINTENANCE_MODE = false; // Set to true to enable maintenance mode
const MAINTENANCE_PAGE = 'maintenance.html';
const MAIN_PAGE = 'index.html';

// Function to enable maintenance mode
function enableMaintenanceMode() {
    console.log('🔧 Enabling maintenance mode...');
    
    // Create a backup of current index.html
    const fs = require('fs');
    const path = require('path');
    
    try {
        // Read current index.html
        const currentIndex = fs.readFileSync('index.html', 'utf8');
        
        // Create backup
        fs.writeFileSync('index-backup.html', currentIndex);
        console.log('✅ Backup created: index-backup.html');
        
        // Copy maintenance page to index.html
        const maintenanceContent = fs.readFileSync(MAINTENANCE_PAGE, 'utf8');
        fs.writeFileSync('index.html', maintenanceContent);
        console.log('✅ Maintenance mode enabled');
        
        console.log('📝 Next steps:');
        console.log('1. Commit and push changes to GitHub');
        console.log('2. Your site will show maintenance page');
        console.log('3. When ready, run: node maintenance-toggle.js disable');
        
    } catch (error) {
        console.error('❌ Error enabling maintenance mode:', error.message);
    }
}

// Function to disable maintenance mode
function disableMaintenanceMode() {
    console.log('🚀 Disabling maintenance mode...');
    
    const fs = require('fs');
    
    try {
        // Check if backup exists
        if (!fs.existsSync('index-backup.html')) {
            console.error('❌ No backup found. Please restore index.html manually.');
            return;
        }
        
        // Restore from backup
        const backupContent = fs.readFileSync('index-backup.html', 'utf8');
        fs.writeFileSync('index.html', backupContent);
        
        // Remove backup file
        fs.unlinkSync('index-backup.html');
        console.log('✅ Maintenance mode disabled');
        console.log('✅ Normal site restored');
        
        console.log('📝 Next steps:');
        console.log('1. Commit and push changes to GitHub');
        console.log('2. Your site will show normal content');
        
    } catch (error) {
        console.error('❌ Error disabling maintenance mode:', error.message);
    }
}

// Function to check current status
function checkStatus() {
    const fs = require('fs');
    
    try {
        const indexContent = fs.readFileSync('index.html', 'utf8');
        const isMaintenanceMode = indexContent.includes('DNS Propagation in Progress');
        
        if (isMaintenanceMode) {
            console.log('🔧 Current status: MAINTENANCE MODE');
            console.log('📄 Showing maintenance page');
        } else {
            console.log('🚀 Current status: NORMAL MODE');
            console.log('📄 Showing normal website');
        }
        
        if (fs.existsSync('index-backup.html')) {
            console.log('💾 Backup file exists: index-backup.html');
        }
        
    } catch (error) {
        console.error('❌ Error checking status:', error.message);
    }
}

// Main execution
const command = process.argv[2];

switch (command) {
    case 'enable':
        enableMaintenanceMode();
        break;
    case 'disable':
        disableMaintenanceMode();
        break;
    case 'status':
        checkStatus();
        break;
    default:
        console.log('🔧 AiThinkWise Maintenance Mode Toggle');
        console.log('');
        console.log('Usage:');
        console.log('  node maintenance-toggle.js enable   - Enable maintenance mode');
        console.log('  node maintenance-toggle.js disable  - Disable maintenance mode');
        console.log('  node maintenance-toggle.js status   - Check current status');
        console.log('');
        console.log('Examples:');
        console.log('  node maintenance-toggle.js enable   # Show maintenance page');
        console.log('  node maintenance-toggle.js disable  # Show normal website');
        console.log('  node maintenance-toggle.js status   # Check what mode is active');
}
