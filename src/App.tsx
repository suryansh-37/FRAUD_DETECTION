import type { ReactNode } from 'react';
import { ClerkProvider, Show, SignIn, SignUp } from '@clerk/react';
import { Route, Router as WouterRouter, Switch, Redirect } from 'wouter';

import { basePath } from './services/blockchain';
import { clerkPubKey, clerkProxyUrl, appearance } from './config/clerk';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';

import { Landing } from './pages/Landing';
import { Overview } from './pages/Overview';
import { Complaints } from './pages/Complaints';
import { Investigate } from './pages/Investigate';
import { Alerts } from './pages/Alerts';
import { Cases } from './pages/Cases';
import { CaseDetail } from './pages/CaseDetail';
import { Reports } from './pages/Reports';
import { Handoffs } from './pages/Handoffs';
import { Approvals } from './pages/Approvals';
import { Coordination } from './pages/Coordination';
import { Vault } from './pages/Vault';
import { Operations } from './pages/Operations';
import { Audit } from './pages/Audit';
import { Settings } from './pages/Settings';
import { DemoSignIn, DemoSignUp } from './pages/DemoAuth';
import { NotFound } from './pages/NotFound';

import { VictimPortal } from './pages/victim/VictimPortal';
import { VictimReportFraud } from './pages/victim/VictimReportFraud';
import { VictimTrackStatus } from './pages/victim/VictimTrackStatus';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminMonitoring } from './pages/admin/AdminMonitoring';

function AuthGate({ children }: { children: ReactNode }) {
  return (
    <>
      <Show when="signed-in">{children}</Show>
      <Show when="signed-out">
        <Redirect to={`${basePath}/sign-in`} />
      </Show>
    </>
  );
}

function ProtectedRoutes() {
  return (
    <Switch>
      <Route path="/portal" component={Overview} />
      <Route path="/portal/overview" component={Overview} />
      <Route path="/portal/complaints" component={Complaints} />
      <Route path="/portal/investigate" component={Investigate} />
      <Route path="/portal/alerts" component={Alerts} />
      <Route path="/portal/cases" component={Cases} />
      <Route path="/portal/cases/:id" component={CaseDetail} />
      <Route path="/portal/reports" component={Reports} />
      <Route path="/portal/handoffs" component={Handoffs} />
      <Route path="/portal/approvals" component={Approvals} />
      <Route path="/portal/coordination" component={Coordination} />
      <Route path="/portal/vault" component={Vault} />
      <Route path="/portal/integrations" component={Operations} />
      <Route path="/portal/operations" component={Operations} />
      <Route path="/portal/audit" component={Audit} />
      <Route path="/portal/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function DemoRoutes() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/sign-in/*?" component={DemoSignIn} />
      <Route path="/sign-up/*?" component={DemoSignUp} />

      {/* Citizen / Victim Routes */}
      <Route path="/victim" component={VictimPortal} />
      <Route path="/victim/report" component={VictimReportFraud} />
      <Route path="/victim/track" component={VictimTrackStatus} />

      {/* Admin Routes */}
      <Route path="/admin" component={AdminMonitoring} />
      <Route path="/admin/monitoring" component={AdminMonitoring} />
      <Route path="/admin/users" component={AdminUsers} />

      <Route path="/portal">
        <ProtectedRoutes />
      </Route>
      <Route path="/portal/:rest*">
        <ProtectedRoutes />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function ClerkRoutes() {
  return (
    <Switch>
      <Route path="/">
        <Show when="signed-in">
          <Redirect to="/portal" />
        </Show>
        <Show when="signed-out">
          <Landing />
        </Show>
      </Route>
      <Route
        path="/sign-in/*?"
        component={() => (
          <div
            style={{
              minHeight: '100dvh',
              display: 'grid',
              placeItems: 'center',
              padding: 20,
              background: 'hsl(var(--background))',
            }}
          >
            <SignIn
              routing="path"
              path={`${basePath}/sign-in`}
              signUpUrl={`${basePath}/sign-up`}
            />
          </div>
        )}
      />
      <Route
        path="/sign-up/*?"
        component={() => (
          <div
            style={{
              minHeight: '100dvh',
              display: 'grid',
              placeItems: 'center',
              padding: 20,
              background: 'hsl(var(--background))',
            }}
          >
            <SignUp
              routing="path"
              path={`${basePath}/sign-up`}
              signInUrl={`${basePath}/sign-in`}
            />
          </div>
        )}
      />

      {/* Citizen / Victim Routes in Clerk mode */}
      <Route path="/victim" component={VictimPortal} />
      <Route path="/victim/report" component={VictimReportFraud} />
      <Route path="/victim/track" component={VictimTrackStatus} />

      {/* Admin Routes in Clerk mode */}
      <Route path="/admin" component={AdminMonitoring} />
      <Route path="/admin/monitoring" component={AdminMonitoring} />
      <Route path="/admin/users" component={AdminUsers} />

      <Route
        path="/portal/*?"
        component={() => (
          <AuthGate>
            <ProtectedRoutes />
          </AuthGate>
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        {clerkPubKey ? (
          <ClerkProvider
            publishableKey={clerkPubKey}
            proxyUrl={clerkProxyUrl}
            appearance={appearance}
            signInUrl={`${basePath}/sign-in`}
            signUpUrl={`${basePath}/sign-up`}
            routerPush={(path) => window.history.pushState({}, '', path)}
            routerReplace={(path) => window.history.replaceState({}, '', path)}
          >
            <WouterRouter base={basePath}>
              <ClerkRoutes />
            </WouterRouter>
          </ClerkProvider>
        ) : (
          <WouterRouter base={basePath}>
            <DemoRoutes />
          </WouterRouter>
        )}
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;