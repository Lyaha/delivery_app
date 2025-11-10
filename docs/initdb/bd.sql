
CREATE TABLE Users (
    user_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE Roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE UserRoles (
    user_role_id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    role_id INT NOT NULL REFERENCES Roles(role_id) ON DELETE CASCADE,
    UNIQUE(user_id, role_id)
);

CREATE TABLE Addresses (
    address_id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES Users(user_id) ON DELETE SET NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    zip_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'Украина',
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
);

CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parent_category_id INT REFERENCES Categories(category_id) ON DELETE SET NULL
);

CREATE TABLE Suppliers (
    supplier_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20)
);

CREATE TABLE Products (
    product_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    unit_price DECIMAL(12, 2) NOT NULL CHECK (unit_price >= 0),
    sku VARCHAR(50) UNIQUE NOT NULL,
    quantity_in_stock INT NOT NULL DEFAULT 0 CHECK (quantity_in_stock >= 0),
    reorder_level INT NOT NULL DEFAULT 0 CHECK (reorder_level >= 0),
    supplier_id INT NOT NULL REFERENCES Suppliers(supplier_id) ON DELETE RESTRICT,
    category_id INT NOT NULL REFERENCES Categories(category_id) ON DELETE RESTRICT,
    weight_kg DECIMAL(10, 2) CHECK (weight_kg >= 0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE ProductImages (
    image_id SERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES Products(product_id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Orders (
    order_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES Users(user_id) ON DELETE RESTRICT,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(12, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (
        status IN ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned')
    ),
    payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (
        payment_status IN ('Pending', 'Paid', 'Failed', 'Refunded')
    ),
    shipping_address_id INT NOT NULL REFERENCES Addresses(address_id),
    customer_notes TEXT
);

CREATE TABLE OrderItems (
    order_item_id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES Orders(order_id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES Products(product_id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_time_of_purchase DECIMAL(12, 2) NOT NULL CHECK (price_at_time_of_purchase >= 0),
    subtotal_amount DECIMAL(12, 2) GENERATED ALWAYS AS (quantity * price_at_time_of_purchase) STORED
);

CREATE TABLE Payments (
    payment_id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES Orders(order_id),
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('Credit Card', 'Cash on Delivery', 'Bank Transfer', 'E-Wallet')),
    amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
    transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Success', 'Failed', 'Refunded')),
    external_transaction_id VARCHAR(255)
);

CREATE TABLE Warehouses (
    warehouse_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address_id INT NOT NULL REFERENCES Addresses(address_id),
    capacity INT NOT NULL CHECK (capacity > 0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE WarehouseStock (
    warehouse_stock_id SERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES Products(product_id) ON DELETE CASCADE,
    warehouse_id INT NOT NULL REFERENCES Warehouses(warehouse_id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    UNIQUE(product_id, warehouse_id)
);

CREATE TABLE Couriers (
    courier_id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES Users(user_id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    current_geo GEOMETRY(Point, 4326),
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    vehicle_type VARCHAR(50)
);

CREATE TABLE Shipments (
    shipment_id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES Orders(order_id),
    courier_id INT REFERENCES Couriers(courier_id) ON DELETE SET NULL,
    tracking_number VARCHAR(50) UNIQUE NOT NULL,
    carrier_service_type VARCHAR(50) NOT NULL DEFAULT 'Standard',
    shipping_cost DECIMAL(10, 2) NOT NULL CHECK (shipping_cost >= 0),
    origin_warehouse_id INT NOT NULL REFERENCES Warehouses(warehouse_id),
    destination_address_id INT NOT NULL REFERENCES Addresses(address_id),
    estimated_delivery_date DATE,
    actual_delivery_date TIMESTAMP,
    CONSTRAINT fk_shipment_order UNIQUE(order_id, shipment_id)
);

CREATE TABLE ShipmentItems (
    shipment_item_id BIGSERIAL PRIMARY KEY,
    shipment_id BIGINT NOT NULL REFERENCES Shipments(shipment_id) ON DELETE CASCADE,
    order_item_id BIGINT NOT NULL REFERENCES OrderItems(order_item_id) ON DELETE CASCADE,
    quantity INT NOT NULL CHECK (quantity > 0),
    UNIQUE(shipment_id, order_item_id)
);

CREATE TABLE ShipmentTrackingHistory (
    tracking_id BIGSERIAL PRIMARY KEY,
    shipment_id BIGINT NOT NULL REFERENCES Shipments(shipment_id) ON DELETE CASCADE,
    status_type VARCHAR(50) NOT NULL CHECK (
        status_type IN ('Label Created', 'In Transit', 'Out for Delivery', 'Delivered', 'Exception')
    ),
    status_description TEXT NOT NULL,
    location GEOMETRY(Point, 4326),
    event_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Returns (
    return_id SERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES Orders(order_id),
    user_id BIGINT NOT NULL REFERENCES Users(user_id),
    return_reason TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Requested' CHECK (
        status IN ('Requested', 'Approved', 'Rejected', 'Refunded')
    ),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ReturnItems (
    return_item_id SERIAL PRIMARY KEY,
    return_id INT NOT NULL REFERENCES Returns(return_id) ON DELETE CASCADE,
    order_item_id BIGINT NOT NULL REFERENCES OrderItems(order_item_id),
    quantity INT NOT NULL CHECK (quantity > 0)
);
