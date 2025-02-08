# KDA Bus Booking API

A robust RESTful API for managing bus bookings, routes, and user management. Built with Node.js, Express, and MySQL/PostgreSQL using Sequelize ORM.

## Overview

This API serves as the backend for a bus booking system, allowing users to search for routes, book tickets, and manage their travel plans. It includes comprehensive admin functionality for managing buses, routes, and bookings.

## Features Implemented

### Authentication & User Management
- ✅ User registration with email and phone validation
- ✅ JWT-based authentication with token management
- ✅ Role-based access control (Admin, Super-admin, Transporter)
- ✅ User profile management
- ✅ Secure password hashing
- ✅ Token cleanup automation

### Bus Management
- ✅ CRUD operations for buses
- ✅ Bus amenities tracking (WiFi, Toilet, AC, etc.)
- ✅ Bus capacity and registration management
- ✅ Company-wise bus organization

### Route Management
- ✅ Route creation and management
- ✅ Distance and estimated time tracking
- ✅ Route policies and descriptions
- ✅ French cities integration for routes

### Booking System
- ✅ Ticket booking functionality
- ✅ Booking status management
- ✅ Ticket availability tracking
- ✅ Booking cancellation handling

### Search Functionality
- ✅ Route search implementation
- ✅ City search with French cities database
- ✅ Popular destinations highlighting
- ✅ Search result optimization

### Database Structure
- ✅ User management tables
- ✅ Bus and route tables
- ✅ Booking and ticket tables
- ✅ Token management tables
- ✅ Proper indexing and constraints

## Technical Features

### Security
- JWT authentication
- Password hashing with bcrypt
- Role-based access control
- Token expiration and cleanup

### Performance
- Database indexing
- Query optimization
- Efficient token management
- Caching implementation

### Code Organization
- MVC architecture
- Service layer pattern
- Middleware implementation
- Validation layers

## Upcoming Features

1. Payment Integration
   - Payment gateway integration
   - Multiple payment methods
   - Refund handling

2. Advanced Booking Features
   - Seat selection
   - Group bookings
   - Booking modifications

3. Notification System
   - Email notifications
   - SMS notifications
   - Booking reminders

4. Reporting System
   - Booking analytics
   - Revenue reports
   - Route performance metrics

## API Documentation

Comprehensive API documentation is available with Swagger UI at `/api-docs` endpoint.

## Environment Setup
