import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../services/queries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
  const [email, setEmail] = useState('gouveia32@gmail.com');
  const [password, setPassword] = useState('123456');
  const [login, { loading }] = useMutation(LOGIN);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ variables: { email, password } })
      .then(response => {
        if (response.data.login) {
          //console.log(response.data.login);
          localStorage.setItem('authToken', JSON.stringify({
            token: response.data.login.token,
            id: response.data.login.id,
            email: response.data.login.email,
            name: response.data.login.name,
            accountId: response.data.login.accountId,
          }));
          window.location.href = '/dashboard';
        }
      })
      .catch(err => {
        alert('Invalid email or password');
        console.error(err);
      });
  };

  const handleRedirect = () => {
    window.location.href = '/register';
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="space-y-6 w-full max-w-sm">
        <div className="text-3xl font-bold text-center">Woovi</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex space-x-2">
            <Button type="submit" size="lg" className="bg-[#113463] hover:text-[#0f2f52] flex-1">
              {loading ? 'Loading...' : 'Login'}
            </Button>
            <Button type="button" size="lg" onClick={handleRedirect} className="bg-[#113463] hover:text-[#0f2f52] flex-1">
              Create an account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}