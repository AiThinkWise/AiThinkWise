# AiThinkWise Maintenance Mode Guide

## Overview
This maintenance system allows you to easily switch your website between normal mode and maintenance mode during DNS propagation, updates, or other maintenance situations.

## Files Created

### 1. `maintenance.html`
- Beautiful maintenance page with animated progress bar
- Shows DNS propagation status
- Includes contact information
- Auto-refreshes every 5 minutes
- Automatically redirects when site is back up

### 2. `maintenance-toggle.js`
- Node.js script to easily toggle between modes
- Creates automatic backups
- Safe restore functionality

### 3. `MAINTENANCE_GUIDE.md`
- This guide explaining how to use the system

## How to Use

### Enable Maintenance Mode
```bash
node maintenance-toggle.js enable
```
This will:
- Create a backup of your current `index.html`
- Replace `index.html` with the maintenance page
- Show maintenance page to all visitors

### Disable Maintenance Mode
```bash
node maintenance-toggle.js disable
```
This will:
- Restore your original `index.html` from backup
- Remove the backup file
- Show your normal website

### Check Current Status
```bash
node maintenance-toggle.js status
```
This will show:
- Whether you're in maintenance mode or normal mode
- If backup files exist

## Manual Method (Alternative)

### Enable Maintenance Mode Manually
1. Rename `index.html` to `index-backup.html`
2. Rename `maintenance.html` to `index.html`
3. Commit and push to GitHub

### Disable Maintenance Mode Manually
1. Rename `index.html` to `maintenance.html`
2. Rename `index-backup.html` to `index.html`
3. Commit and push to GitHub

## Features of the Maintenance Page

### Visual Elements
- ✅ Professional AiThinkWise branding
- ✅ Animated progress bar
- ✅ Floating background shapes
- ✅ Responsive design for all devices

### Functionality
- ✅ Auto-refresh every 5 minutes
- ✅ Checks if main site is back up every 30 seconds
- ✅ Automatic redirect when site is ready
- ✅ Contact information for urgent inquiries

### SEO Considerations
- ✅ `noindex, nofollow` meta tags
- ✅ Proper title and description
- ✅ Professional appearance

## When to Use

### DNS Propagation (Current Situation)
- Use during nameserver changes
- Show estimated completion time
- Keep users informed about progress

### Website Updates
- Use during major updates
- Show progress and estimated time
- Provide contact information

### Server Maintenance
- Use during server maintenance
- Show maintenance status
- Keep users informed

## Customization

### Update Contact Information
Edit `maintenance.html` and update:
- Email address
- Social media links
- Contact details

### Change Maintenance Message
Edit the status card in `maintenance.html`:
```html
<div class="status-title">🚀 DNS Propagation in Progress</div>
<div class="status-description">
    Your custom message here...
</div>
```

### Update Estimated Time
Change the estimated completion time:
```html
<div class="estimated-time">Estimated completion: Your time here</div>
```

## Best Practices

1. **Always create backups** before enabling maintenance mode
2. **Test the maintenance page** before going live
3. **Update the message** to reflect the actual maintenance being performed
4. **Provide contact information** for urgent inquiries
5. **Set realistic time estimates** for completion

## Troubleshooting

### Maintenance page not showing
- Check if `index.html` was properly replaced
- Verify the file was committed and pushed to GitHub
- Wait for GitHub Pages to deploy (1-2 minutes)

### Can't restore normal site
- Check if `index-backup.html` exists
- Manually restore from your Git history if needed
- Use `git checkout HEAD~1 index.html` to restore previous version

### Auto-redirect not working
- Check browser console for errors
- Verify the main site URL is correct
- Test the fetch request manually

## Current DNS Propagation Status

**Status**: DNS Propagation in Progress  
**Started**: [When you changed nameservers]  
**Estimated Completion**: 24-48 hours  
**Next Check**: [Set reminder for tomorrow]  

## Support

If you need help with the maintenance system:
- Check this guide first
- Review the console output for errors
- Contact: vanjerson2@gmail.com

---

**Remember**: Always test the maintenance system before using it in production!
