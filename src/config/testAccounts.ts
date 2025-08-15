// Test accounts configuration
export interface TestAccount {
  email: string;
  password: string;
  user: {
    id: string;
    email: string;
    username: string;
    avatar: string;
  };
}

export const TEST_ACCOUNTS: TestAccount[] = [
  {
    email: 'demo@example.com',
    password: 'password123',
    user: {
      id: 'demo-user-1',
      email: 'demo@example.com',
      username: 'demo',
      avatar: '/src/assets/Users/john-doe.png',
    },
  },
  {
    email: 'test@user.com',
    password: 'testpass',
    user: {
      id: 'test-user-2',
      email: 'test@user.com',
      username: 'testuser',
      avatar: '/src/assets/Users/jane-doe.png',
    },
  },
];

export const findTestAccount = (email: string, password: string): TestAccount | null => {
  return TEST_ACCOUNTS.find(
    account => account.email === email && account.password === password
  ) || null;
};

export const isTestAccount = (email: string): boolean => {
  return TEST_ACCOUNTS.some(account => account.email === email);
};
