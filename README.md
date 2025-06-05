# n8n-nodes-immybot

This is an n8n community node. It lets you use ImmyBot in your n8n workflows.

ImmyBot is an automated workstation deployment and management tool.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following operations:

### Tags
- **Create**: Create a new tag
- **Delete**: Delete a tag by ID
- **Get Many Tags**: Get all tags with optional name filtering
- **Get Tag**: Get a specific tag by ID or name (flexible filtering)
- **Update**: Update an existing tag by ID

### Provider Links
- **Get Many Provider Links**: Get all provider links with configurable boolean options
  - Boolean options for including clients, unlinked clients, and version validation
- **Get Provider Link**: Get a specific provider link by ID
  - Boolean values (includeClients, includeUnlinkedClients, throwIfAgentInstallerVersionNotSet) are automatically set to `true` for complete information
- **Get Provisioning Package**: Get a provisioning package URI with onboarding options
  - Returns structured JSON output with `ppkg_url` field instead of raw URL string

### Maintenance
- **Run**: Run maintenance or software installation on specified computers with options for:
  - Maintenance parameters (session group, task mode, maintenance type, etc.)
  - Execution options (reboot preferences, scheduling, etc.)
  - Deployment options (deployment type, offline behavior, etc.)
  - Email notifications
  - UI customization
  - Target selection (computers, tenants, persons)

### Computers
- **Get Inventory**: Get all computer inventory
- **Get Computers Paged**: Retrieve computer details with comprehensive filtering and pagination options
  - Filter by criteria, tenant ID, and various computer states
  - Pagination controls (skip, take, sort, sort direction)
  - Boolean filters for onboarding, stale, dev lab, licensed, deleted, and offline computers
- **Get Agent Status**: Retrieve agent status for computers by user ID
- **Get User Affinities**: Retrieve user affinities for a specific computer by Computer ID

### Tenants
- **Create**: Create a new tenant
- **Delete**: Delete multiple tenants at once (JSON array of tenant IDs)
- **Get Many Tenants**: Get all tenants with optional name filtering
- **Get Tenant**: Get a specific tenant by ID
- **Update**: Update an existing tenant

### Users
- **Create User**: Create a new user from an existing person
- **Delete a User**: Delete a user by user ID
- **Get Many Users**: Get all users
- **Get User**: Get a specific user by ID
- **Update a User**: Update settings for an existing user

### Persons
- **Create Person**: Create a new person
- **Delete Person**: Delete a person by person ID
- **Get Many Persons**: Get all persons
- **Get Person**: Get a specific person by ID

## Interface Improvements

This node features a clean, consistent interface with the following improvements:

- **Consistent naming**: All resources follow the same "Get Many {Resource}" and "Get {Resource}" pattern
- **Organized operations**: Each operation has a single, clear purpose
- **Intuitive parameters**: Only relevant fields are shown based on the selected operation
- **Flexible filtering**: Where applicable, operations support multiple filtering options
- **Simplified workflows**: Reduced cognitive load with clear operation names and purposes

## Credentials

To use this node, you'll need to set up an Entra App Registration and configure it with ImmyBot. Here's how:

1. Create an Entra App Registration:
   - Go to the Azure Portal
   - Navigate to Azure Active Directory > App registrations
   - Click "New registration"
   - Give your app a name
   - Select "Single tenant" for supported account types
   - Click "Register"

2. Configure the App Registration:
   - Note down the Application (client) ID
   - Create a new client secret:
     - Go to "Certificates & secrets"
     - Click "New client secret"
     - Add a description and select an expiration
     - Copy the secret value immediately (you won't be able to see it again)
   - Click on the "Enterprise applications" link in the left sidebar
   - Find your app in the list and click on it
   - Copy the Object ID from the Overview page

3. Configure ImmyBot:
   - In your ImmyBot tenant, go to Settings > Users
   - Add a new user
   - Use the Object ID from your Entra App Registration as the username
   - Assign appropriate roles to the user

4. In n8n:
   - Create new credentials for ImmyBot
   - Enter the Client ID and Client Secret from your Entra App Registration
   - For the Access Token URL, use: `https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token`
     (Replace `{tenant-id}` with your tenant ID from the app registration)
   - For the Scope, use: `https://{subdomain}.immy.bot/.default`
     (Replace `{subdomain}` with your ImmyBot subdomain)
   - Save the credentials

## Compatibility

This node is compatible with n8n version 1.0.0 and above.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [ImmyBot Documentation](https://docs.immy.bot/)
* [ImmyBot Integration Guide](https://docs.immy.bot/build-your-own-integration.html)


