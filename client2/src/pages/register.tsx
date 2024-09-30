import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../services/queries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCPF, parseCPF } from '../utils/functions';
import { validateForm, ValidationResult } from '../utils/validations';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [errors, setErrors] = useState<ValidationResult | null>(null);
    const [createUser, { loading }] = useMutation(CREATE_USER);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationResults = validateForm(name, email, password, cpf);

        if (Object.values(validationResults).every((isValid) => isValid)) {
            createUser({ variables: { name, email, password, cpf } })
                .then(response => {
                    if (response.data.createUser) {
                        localStorage.setItem('authToken', JSON.stringify({
                            token: response.data.createUser.token,
                            id: response.data.createUser.id,
                            email: response.data.createUser.email,
                            name: response.data.createUser.name,
                            accountId: response.data.createUser.accountId
                        }));
                        window.location.href = '/dashboard';
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            setErrors(validationResults);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="space-y-6 w-full max-w-md">
                <div className="text-3xl font-bold text-center mb-8">Woovi</div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        {errors?.name === false && (
                            <div className="text-red-500 text-sm absolute -top-5 left-0">
                                Name must be at least 3 characters.
                            </div>
                        )}
                        <Input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="relative">
                        {errors?.email === false && (
                            <div className="text-red-500 text-sm absolute -top-5 left-0">
                                Please enter a valid email address.
                            </div>
                        )}
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="relative">
                        {errors?.password === false && (
                            <div className="text-red-500 text-sm absolute -top-5 left-0">
                                Password must be at least 6 characters.
                            </div>
                        )}
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div className="relative">
                        {errors?.cpf === false && (
                            <div className="text-red-500 text-sm absolute -top-5 left-0">
                                CPF must be 11 digits.
                            </div>
                        )}
                        <Input
                            type="text"
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => {
                                const formattedValue = formatCPF(e.target.value);
                                setCpf(formattedValue);
                            }}
                            onBlur={() => {
                                const numericValue = parseCPF(cpf);
                                console.log("CPF Numeric Value:", numericValue);
                            }}
                            className="w-full"
                        />
                    </div>

                    <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-[#113463] text-white hover:bg-[#0f2f52]"
                    >
                        {loading ? 'Loading...' : 'Register'}
                    </Button>
                </form>
            </div>
        </div>
    );
}