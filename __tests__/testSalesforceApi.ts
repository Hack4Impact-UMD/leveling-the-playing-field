async function testSalesforceOperations() {
  try {
    // 1. create an opportunity
    console.log('1. Testing CREATE...');
    const createResponse = await fetch('http://localhost:3000/api/opportunities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: 'Test Opportunity',
        StageName: 'Prospecting',
        CloseDate: '2024-12-31',
        Amount: 10000
      })
    });
    
    const createResult = await createResponse.json();
    console.log('Create Result:', createResult);
    
    if (!createResult.id) {
      throw new Error('Failed to create opportunity');
    }
    const opportunityId = createResult.id;

    // 2. get the opportunity
    console.log('\n2. Testing GET...');
    const getResponse = await fetch(`http://localhost:3000/api/opportunities/${opportunityId}`);
    const getResult = await getResponse.json();
    console.log('Get Result:', getResult);

    // 3. update the opportunity
    console.log('\n3. Testing UPDATE...');
    const updateResponse = await fetch(`http://localhost:3000/api/opportunities/${opportunityId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Amount: 15000,
        StageName: 'Qualification'
      })
    });
    const updateResult = await updateResponse.json();
    console.log('Update Result:', updateResult);

    // 4. delete the opportunity
    console.log('\n4. Testing DELETE...');
    const deleteResponse = await fetch(`http://localhost:3000/api/opportunities/${opportunityId}`, {
      method: 'DELETE'
    });
    const deleteResult = await deleteResponse.json();
    console.log('Delete Result:', deleteResult);

  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testSalesforceOperations(); 