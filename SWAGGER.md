# Swagger API Integration Guide

## Admin Panel Integration

This guide explains how to integrate the Blue Escape Backend API with your admin panel using the Swagger/OpenAPI specification.

## Quick Start - API JSON URL

**Primary Integration URL**: `http://localhost:3000/api/docs-json`

This endpoint provides the complete OpenAPI 3.0 specification in JSON format that your admin panel can consume to understand the entire API structure.

### Environment-Specific URLs

- **Development**: `http://localhost:3000/api/docs-json`
- **Staging**: `https://staging.your-domain.com/api/docs-json`
- **Production**: `https://api.your-domain.com/api/docs-json`

## API Overview

The Blue Escape Backend provides comprehensive travel and experience management functionality with the following modules:

### Available Endpoints

#### Health Check
- `GET /health` - Service health status

#### Blogs (v1)
- `GET /api/v1/blogs` - List all blogs (with optional filtering by region, country, city)
- `POST /api/v1/blogs` - Create new blog
- `GET /api/v1/blogs/{id}` - Get specific blog
- `PATCH /api/v1/blogs/{id}` - Update blog
- `DELETE /api/v1/blogs/{id}` - Delete blog

#### Collections (v1)
- `GET /api/v1/collections` - List all collections
- `POST /api/v1/collections` - Create new collection
- `GET /api/v1/collections/{id}` - Get specific collection
- `PATCH /api/v1/collections/{id}` - Update collection
- `DELETE /api/v1/collections/{id}` - Delete collection
- `POST /api/v1/collections/content` - Create collection content
- `GET /api/v1/collections/content/all` - List all collection contents
- `GET /api/v1/collections/content/{id}` - Get specific collection content
- `GET /api/v1/collections/{id}/content` - Get contents for specific collection
- `PATCH /api/v1/collections/content/{id}` - Update collection content
- `DELETE /api/v1/collections/content/{id}` - Delete collection content

#### Experiences (v1)
- `GET /api/v1/experiences` - List all experiences (with optional filtering by region, country, city, tag)
- `POST /api/v1/experiences` - Create new experience
- `GET /api/v1/experiences/{id}` - Get specific experience
- `PATCH /api/v1/experiences/{id}` - Update experience
- `DELETE /api/v1/experiences/{id}` - Delete experience

## Admin Panel Integration Steps

### 1. Fetch API Specification

Make a GET request to the JSON endpoint:

```javascript
const apiSpec = await fetch('http://localhost:3000/api/docs-json')
  .then(response => response.json());
```

### 2. Parse the OpenAPI Specification

The returned JSON contains:
- **paths**: All available endpoints with methods, parameters, and responses
- **components**: Data schemas for request/response models
- **tags**: Endpoint groupings (blogs, collections, experiences, health)
- **info**: API metadata (title, version, description)

### 3. Generate Admin Interface

Use the specification to:
- Generate forms based on schema definitions
- Create CRUD interfaces for each resource
- Implement filtering and search functionality
- Set up validation based on schema constraints

### 4. Handle Authentication (If Applicable)

Currently, the API doesn't require authentication, but if you add it later, the Swagger spec will include security definitions.

## Data Models

### Blog Model
- **title**: Blog post title (required)
- **slug**: URL-friendly identifier (optional)
- **content**: Array of content sections with title and body
- **featured_media**: Featured image URL (optional)
- **tags**: Array of tags (optional)
- **region/country/city**: Geographic information (optional)
- **author_name/about_author**: Author details (optional)
- **published_at**: Publication date (optional)

### Collection Model
- **name**: Collection name (required)

### Collection Content Model
- **collection_id**: Associated collection UUID (required)
- **hero_media**: Hero image URL (optional)
- **about_collection**: Description (optional)
- **features**: Array of feature objects (optional)
- **about_destination**: Array of destination info (optional)
- **region/country/city**: Geographic information (optional)

### Experience Model
- **title**: Experience title (required)
- **featured_media**: Featured image URL (optional)
- **excerpt**: Brief description (optional)
- **content**: Array of content sections (optional)
- **best_time**: Array of optimal visit periods (optional)
- **gallery**: Array of gallery items (optional)
- **tags**: Array of tags (optional)
- **region/country/city**: Geographic information (optional)

## Testing the Integration

### 1. Verify API Availability
```bash
curl http://localhost:3000/api/docs-json
```

### 2. Test Basic Endpoints
```bash
# Health check
curl http://localhost:3000/health

# Get all blogs
curl http://localhost:3000/api/v1/blogs

# Get blogs by region
curl "http://localhost:3000/api/v1/blogs?region=Asia"
```

### 3. Access Swagger UI (Development)
For development and testing, you can also access the interactive Swagger UI at:
`http://localhost:3000/api/docs`

## Error Handling

The API returns standard HTTP status codes:
- **200**: Success
- **201**: Created
- **400**: Bad Request (validation errors)
- **404**: Not Found
- **500**: Internal Server Error

## Filtering and Querying

Several endpoints support query parameters for filtering:
- **region**: Filter by geographic region
- **country**: Filter by country
- **city**: Filter by city
- **tag**: Filter by tag (experiences only)

## Updates and Versioning

The API uses URI versioning (e.g., `/api/v1/`). The OpenAPI specification will always reflect the current available endpoints and schemas. Check the `info.version` field in the JSON response for the current API version.

## Support

For questions about the API integration:
1. Check the interactive Swagger UI at `/api/docs` for detailed endpoint documentation
2. Use the JSON specification at `/api/docs-json` for programmatic integration
3. Refer to this guide for admin panel specific integration patterns

The OpenAPI specification provides complete, up-to-date documentation of all available endpoints, request/response schemas, and validation rules needed for your admin panel integration.