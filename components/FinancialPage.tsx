import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Download,
  Plus,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Sidebar from './Sidebar';

interface FinancialPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userType: 'admin' | 'collaborator' | 'client' | null;
}

export default function FinancialPage({ onNavigate, onLogout, userType }: FinancialPageProps) {
  const transactions = [
    { id: 1, client: 'TechCorp', project: 'Identidade Visual', amount: 8500, status: 'pago', date: '2024-02-10', type: 'receita' },
    { id: 2, client: 'StartupXYZ', project: 'Website', amount: 12000, status: 'pendente', date: '2024-02-15', type: 'receita' },
    { id: 3, client: 'Empresa ABC', project: 'Material Gráfico', amount: 3500, status: 'atrasado', date: '2024-01-30', type: 'receita' },
  ];

  // Only admin can see this page
  if (userType !== 'admin') {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar 
          currentPage="financial" 
          onNavigate={onNavigate} 
          onLogout={onLogout} 
          userType={userType} 
        />
        <main className="flex-1 flex items-center justify-center">
          <Card className="rounded-2xl border-border/50 max-w-md">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-medium mb-2">Acesso Restrito</h3>
              <p className="text-muted-foreground">
                Apenas administradores podem acessar informações financeiras.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        currentPage="financial" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        userType={userType} 
      />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-semibold">Financeiro</h1>
              <p className="text-muted-foreground">Gerencie receitas e pagamentos</p>
            </div>
            <Button className="rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                    <p className="text-2xl font-semibold">R$ 24.000</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Recebido</p>
                    <p className="text-2xl font-semibold text-success">R$ 8.500</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pendente</p>
                    <p className="text-2xl font-semibold text-coffee">R$ 12.000</p>
                  </div>
                  <Calendar className="w-8 h-8 text-coffee" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Atrasado</p>
                    <p className="text-2xl font-semibold text-destructive">R$ 3.500</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Transações Recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-border/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium">{transaction.client}</h4>
                      <p className="text-sm text-muted-foreground">{transaction.project}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold">R$ {transaction.amount.toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          transaction.status === 'pago' ? 'default' :
                          transaction.status === 'pendente' ? 'secondary' : 'destructive'
                        }
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{transaction.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}