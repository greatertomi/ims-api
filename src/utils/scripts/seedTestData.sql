insert into products ("coreNumber", "internalTitle", vendor, "vendorTitle", "vendorSku", "backupVendor", "backupVendorSKU", restockable,
                      "productUrl", "noteForNextOrder", "casePack", "piecesPerInternalBox", "boxesPerCase", tag1, tag2, tag3, tag4, hamzat,
                      "ignoreUntil", notes, "vendorOrderUnit", "vendorCasePack", moq, "bufferDays", "minimumLevel", active)
values
    ('Core-10001','Car CD Visor Organizer Core','Vendor 37',null,'SKU 28614','Vendor 59','SKU 44562',
     false,null,null,null,14,0,null,null,null,null,null,null,null,'Case',null,5,10,null, true),

    ('Core-00002','Camel Tire 383154 1-1/4 Metal Extentions Core','Vendor 37',null,'SKU 76040','Vendor 31','SKU 99271',
     true,null,null,null,20,0,null,null,null,null,null,null,null,'Piece',null,1,14,null, false),

    ('Core-00003','Liquid Fence 148 Goose Repellent, 1-Gallon Concentrate','Vendor 16',null,'SKU 29009','Vendor 45','SKU 55883',
     true,null,null,null,18,1,null,null,null,null,null,null,null,'Piece',null,10,30,5, true);


insert into locations (warehouse, location, quantity, "productId") values
('1. Cores','A50',10, 1),
('1. Cores','A51',21, 1),
('3. JFN','A52',14, 1),
('2. Pre-Processed','A50',100, 2),
('2. Pre-Processed','A21',90, 2),
('2. Pre-Processed','A22',1, 2),
('2. Pre-Processed','A34',15, 2),
('1. Cores','B03',3, 2),
('1. Cores','A50',30, 3),
('1. Cores','A51',21, 3);