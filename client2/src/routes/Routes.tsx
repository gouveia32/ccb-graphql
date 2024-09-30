import { BrowserRouter as Router, Routes as ReactRoutes, Route } from 'react-router-dom';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Dashboard from '@/pages/dashboard';

const Routes = () => {
    return (
        <Router>
            <ReactRoutes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </ReactRoutes>
        </Router>
    );
};

export default Routes;