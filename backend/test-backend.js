const API_URL = 'http://localhost:5000/api';

const runTest = async () => {
    console.log('🚀 Starting Backend Tests...');

    // Health Check
    try {
        const healthRes = await fetch('http://localhost:5000/');
        const healthText = await healthRes.text();
        if (!healthRes.ok) throw new Error(healthText);
        console.log(`✅ Health Check: Server is running`);
    } catch (error) {
        console.error('❌ Server is NOT running or unreachable. Please start the server with npm run dev.');
        console.error('   Error:', error.message);
        return;
    }

    // Generate unique emails for this run
    const timestamp = Date.now();
    const aliceEmail = `alice${timestamp}@test.com`;
    const bobEmail = `bob${timestamp}@test.com`;
    const password = 'password123';

    let aliceToken, aliceId;
    let bobToken, bobId;

    // 1. Register Alice
    try {
        console.log(`\n--- 1. Registering Alice (${aliceEmail}) ---`);
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Alice', email: aliceEmail, password }),
        });
        const data = await res.json();

        if (res.ok) {
            console.log('✅ Success: User ID:', data._id);
            aliceToken = data.token;
            aliceId = data._id;
        } else {
            console.error('❌ Failed:', data.message);
            return; // Stop if registration fails
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
        return;
    }

    // 2. Register Bob
    try {
        console.log(`\n--- 2. Registering Bob (${bobEmail}) ---`);
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Bob', email: bobEmail, password }),
        });
        const data = await res.json();

        if (res.ok) {
            console.log('✅ Success: User ID:', data._id);
            bobToken = data.token;
            bobId = data._id;
        } else {
            console.error('❌ Failed:', data.message);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }

    // 3. Create Task (Alice)
    let taskId;
    try {
        console.log(`\n--- 3. Alice creating a private task ---`);
        const res = await fetch(`${API_URL}/tasks/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${aliceToken}`
            },
            body: JSON.stringify({ title: 'Alice Private Task', description: 'Nobody else sees this' }),
        });
        const data = await res.json();

        if (res.ok) {
            console.log('✅ Success: Task ID:', data._id);
            taskId = data._id;
        } else {
            console.error('❌ Failed:', data.message);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }

    // 4. Create Assigned Task (Alice -> Bob)
    try {
        console.log(`\n--- 4. Alice assigning task to Bob ---`);
        const res = await fetch(`${API_URL}/tasks/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${aliceToken}`
            },
            body: JSON.stringify({
                title: 'Bob Task',
                description: 'Bob needs to do this',
                assignedToEmail: bobEmail
            }),
        });
        const data = await res.json();

        if (res.ok) {
            console.log(`✅ Success: Task assigned to User ID: ${data.assignedTo}`);
        } else {
            console.error('❌ Failed:', data.message);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }

    // 5. Bob Checks Assigned Tasks
    try {
        console.log(`\n--- 5. Bob checking assigned tasks ---`);
        const res = await fetch(`${API_URL}/tasks/assigned`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bobToken}`
            }
        });
        const data = await res.json();

        if (res.ok) {
            const found = data.find(t => t.title === 'Bob Task');
            if (found) {
                console.log('✅ Success: Bob sees the task!');
                console.log(`   Task: "${found.title}" created by ${found.createdBy.name}`);
            } else {
                console.error('❌ Failed: Bob did not find the task.');
            }
        } else {
            console.error('❌ Failed:', data.message);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }

    console.log('\n✅ TEST SEQUENCE COMPLETE');
};

runTest();
