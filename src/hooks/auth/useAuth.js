// src/hooks/useAuth.js
import { useContext } from 'react';
import AuthContext from '../../contexto/ContextoAuth';

export const useAuth = () => useContext(AuthContext);
