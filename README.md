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
- **Get**: Get all tags
- **Get by ID**: Get a specific tag by its ID
- **Update**: Update an existing tag by ID

### Provider Links
- **Get Many Provider Links**: Get all provider links with optional filtering
  - _Optional_: Filter by Provider Link ID. If an ID is provided, only that provider link will be returned.
  - Boolean options for including clients, unlinked clients, and version validation
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
- **Get Computers Paged**: Retrieve computer details with optional filtering
- **Get Agent Status**: Retrieve agent status for computers by user ID

### Tenants
- **Create**: Create a new tenant
- **Update**: Update an existing tenant
- **Get Many**: Get information about many tenants
  - _Optional_: Filter by Tenant ID. If a Tenant ID is provided, only that tenant will be returned.
  - Filter field supports both Fixed and Expression modes for dynamic filtering (e.g., `name==Example Company Inc.`)
- **Bulk Delete**: Delete multiple tenants at once

### Users
- **Create User From Person**: Create a new user from an existing person
- **Update**: Update settings for an existing user
- **Delete**: Delete a user by user ID
- **Get Users**: Retrieve a list of users
  - _Optional_: Filter by User ID. If a User ID is provided, only that user will be returned.

### Persons
- **Create Person**: Create a new person
- **Delete Person**: Delete a person by person ID
- **Get People**: Retrieve a list of people
  - _Optional_: Filter by Person ID. If a Person ID is provided, only that person will be returned.

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


