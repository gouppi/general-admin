db.createUser(
    {
        user: 'testUser',
        pwd: 'testPass',
        roles: [
            {
                role: 'readWrite',
                db: 'Duckburg'
            }
        ]
    }
);

db.createCollection(
    {
        name: "users"
    }
);