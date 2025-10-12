/**
 * DNS Propagation Checker for AiThinkWise
 * 
 * This script helps you monitor when DNS propagation is complete
 * and your Cloudflare Page Rules are working.
 */

const https = require('https');

// Configuration
const DOMAIN = 'aithinkwise.com';
const EXPECTED_REDIRECT = 'https://www.aithinkwise.com';

// Colors for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkRedirect(url) {
    return new Promise((resolve) => {
        const options = {
            method: 'HEAD',
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        };

        const req = https.request(url, options, (res) => {
            resolve({
                statusCode: res.statusCode,
                location: res.headers.location,
                finalUrl: res.responseUrl || url
            });
        });

        req.on('error', (error) => {
            resolve({
                error: error.message,
                statusCode: null
            });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({
                error: 'Request timeout',
                statusCode: null
            });
        });

        req.end();
    });
}

function checkGitHubPages() {
    return new Promise((resolve) => {
        const options = {
            method: 'HEAD',
            timeout: 10000
        };

        const req = https.request('https://www.aithinkwise.com', options, (res) => {
            resolve({
                statusCode: res.statusCode,
                working: res.statusCode === 200
            });
        });

        req.on('error', () => {
            resolve({
                statusCode: null,
                working: false
            });
        });

        req.end();
    });
}

async function checkPropagationStatus() {
    log('\n🔍 Checking DNS Propagation Status...', 'blue');
    log('=' .repeat(50), 'blue');
    
    const timestamp = new Date().toLocaleString();
    log(`⏰ Check Time: ${timestamp}`, 'yellow');
    
    // Check 1: GitHub Pages Status
    log('\n📊 1. GitHub Pages Status:', 'bold');
    const githubStatus = await checkGitHubPages();
    if (githubStatus.working) {
        log('   ✅ www.aithinkwise.com is accessible', 'green');
    } else {
        log('   ❌ www.aithinkwise.com is not accessible', 'red');
    }
    
    // Check 2: Redirect Status
    log('\n🔄 2. Redirect Status:', 'bold');
    const redirectStatus = await checkRedirect(`https://${DOMAIN}`);
    
    if (redirectStatus.error) {
        log(`   ❌ Error: ${redirectStatus.error}`, 'red');
    } else if (redirectStatus.statusCode === 301 || redirectStatus.statusCode === 302) {
        log(`   ✅ Redirect working! (${redirectStatus.statusCode})`, 'green');
        log(`   📍 Redirects to: ${redirectStatus.location}`, 'green');
        
        if (redirectStatus.location === EXPECTED_REDIRECT) {
            log('   🎉 PERFECT! Redirecting to correct URL', 'green');
        } else {
            log(`   ⚠️  Warning: Redirecting to unexpected URL`, 'yellow');
        }
    } else if (redirectStatus.statusCode === 200) {
        log('   ⏳ Still showing 200 OK (no redirect yet)', 'yellow');
        log('   📝 This means DNS propagation is still in progress', 'yellow');
    } else {
        log(`   ❓ Unexpected status: ${redirectStatus.statusCode}`, 'red');
    }
    
    // Check 3: Nameserver Status
    log('\n🌐 3. Nameserver Check:', 'bold');
    log('   📋 Current nameservers should be:', 'yellow');
    log('   • bailey.ns.cloudflare.com', 'yellow');
    log('   • ian.ns.cloudflare.com', 'yellow');
    log('   💡 Check with: nslookup -type=NS aithinkwise.com', 'yellow');
    
    // Summary
    log('\n📋 SUMMARY:', 'bold');
    if (redirectStatus.statusCode === 301 || redirectStatus.statusCode === 302) {
        log('🎉 DNS PROPAGATION IS COMPLETE!', 'green');
        log('✅ Cloudflare Page Rules are working', 'green');
        log('✅ Redirects are functioning properly', 'green');
        log('\n🚀 Next Steps:', 'blue');
        log('1. Disable maintenance mode: node maintenance-toggle.js disable', 'yellow');
        log('2. Commit and push changes', 'yellow');
        log('3. Your website is ready!', 'yellow');
    } else {
        log('⏳ DNS PROPAGATION STILL IN PROGRESS', 'yellow');
        log('⏰ Estimated completion: 24-48 hours from nameserver change', 'yellow');
        log('\n🔄 Next Steps:', 'blue');
        log('1. Wait for propagation to complete', 'yellow');
        log('2. Run this script again in a few hours', 'yellow');
        log('3. Keep maintenance mode enabled', 'yellow');
    }
    
    log('\n' + '=' .repeat(50), 'blue');
}

// Auto-check every 30 minutes
function startAutoCheck() {
    log('🤖 Starting auto-check every 30 minutes...', 'blue');
    log('Press Ctrl+C to stop', 'yellow');
    
    checkPropagationStatus();
    
    setInterval(() => {
        checkPropagationStatus();
    }, 30 * 60 * 1000); // 30 minutes
}

// Main execution
const command = process.argv[2];

switch (command) {
    case 'auto':
        startAutoCheck();
        break;
    case 'check':
    default:
        checkPropagationStatus();
        break;
}

// Usage instructions
if (process.argv.length < 3) {
    log('\n🔧 AiThinkWise DNS Propagation Checker', 'bold');
    log('Usage:', 'blue');
    log('  node check-propagation.js check  - Check once', 'yellow');
    log('  node check-propagation.js auto   - Auto-check every 30 minutes', 'yellow');
    log('');
    log('Examples:', 'blue');
    log('  node check-propagation.js check  # Check current status', 'yellow');
    log('  node check-propagation.js auto   # Monitor continuously', 'yellow');
}
