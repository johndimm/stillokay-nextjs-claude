// This is a mock authentication endpoint. In a real application,
// you would validate against the database and use proper authentication
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Mock authentication - in a real app, query the database
  if (username === 'demo' && password === 'password123') {
    return res.status(200).json({
      success: true,
      user: {
        id: '1',
        username: 'demo',
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@example.com',
      },
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid username or password',
  });
} 