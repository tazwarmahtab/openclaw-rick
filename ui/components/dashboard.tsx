/**
 * World-Class Responsive Dashboard for OpenClaw Rick System Monitoring
 * 
 * Features:
 * - Real-time system health monitoring
 * - Interactive agent status visualization
 * - Performance metrics with live updates
 * - Self-healing controls via Telegram integration
 * - WCAG 2.1 AA compliant
 * - Mobile-first responsive design
 */

import React, { useState, useEffect } from 'react';
import { DesignSystem } from '../design-system';

// Type Definitions
interface SystemHealth {
  timestamp: Date;
  overall: 'healthy' | 'degraded' | 'critical' | 'offline';
  components: {
    gateway: ComponentStatus;
    telegram: ComponentStatus;
    discord: ComponentStatus;
    nvidia: ComponentStatus;
    ecc: ComponentStatus;
    memory: ComponentStatus;
  };
  lastIncident?: string;
  recoveryActions: string[];
}

interface ComponentStatus {
  status: 'online' | 'degraded' | 'offline';
  uptime: number;
  lastError?: string;
  responseTime?: number;
  resourceUsage?: {
    cpu: number;
    memory: number;
    disk: number;
  };
}

interface AgentStatus {
  id: string;
  type: string;
  state: 'idle' | 'working' | 'assigned' | 'complete' | 'failed' | 'blocked';
  currentTask?: string;
  performance: {
    tasksCompleted: number;
    successRate: number;
    avgResponseTime: number;
  };
}

interface WorkflowMetrics {
  workflowId: string;
  taskType: string;
  platform: string;
  startTime: Date;
  endTime?: Date;
  success: boolean;
  performance: {
    accuracy: number;
    efficiency: number;
    userSatisfaction: number;
  };
}

// Main Dashboard Component
export const RickDashboard: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowMetrics[]>([]);
  const [selectedView, setSelectedView] = useState<'overview' | 'agents' | 'workflows' | 'healing'>('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch system data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data - replace with actual API calls
        const mockHealth: SystemHealth = {
          timestamp: new Date(),
          overall: 'healthy',
          components: {
            gateway: { status: 'online', uptime: 99.8, responseTime: 45 },
            telegram: { status: 'online', uptime: 99.2, responseTime: 120 },
            discord: { status: 'degraded', uptime: 95.1, responseTime: 200 },
            nvidia: { status: 'online', uptime: 99.9, responseTime: 85 },
            ecc: { status: 'online', uptime: 98.5, responseTime: 150 },
            memory: { 
              status: 'degraded', 
              uptime: 97.2, 
              resourceUsage: { cpu: 65, memory: 78, disk: 85 } 
            },
          },
          recoveryActions: ['Cleared memory cache', 'Restarted Discord connection'],
        };

        const mockAgents: AgentStatus[] = [
          {
            id: 'rick-001',
            type: 'rick',
            state: 'working',
            currentTask: 'Analyze project requirements',
            performance: {
              tasksCompleted: 127,
              successRate: 0.94,
              avgResponseTime: 2.3,
            },
          },
          {
            id: 'architect-001',
            type: 'architect',
            state: 'idle',
            performance: {
              tasksCompleted: 89,
              successRate: 0.91,
              avgResponseTime: 1.8,
            },
          },
        ];

        const mockWorkflows: WorkflowMetrics[] = [
          {
            workflowId: 'wf-001',
            taskType: 'code_review',
            platform: 'telegram',
            startTime: new Date(Date.now() - 3600000),
            endTime: new Date(),
            success: true,
            performance: { accuracy: 0.92, efficiency: 0.88, userSatisfaction: 0.95 },
          },
        ];

        setSystemHealth(mockHealth);
        setAgents(mockAgents);
        setWorkflows(mockWorkflows);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Component Styles
  const styles = {
    dashboard: {
      fontFamily: DesignSystem.tokens.typography.fontFamily.sans.join(', '),
      backgroundColor: isDarkMode ? DesignSystem.tokens.colors.primary[900] : DesignSystem.tokens.colors.primary[50],
      color: isDarkMode ? DesignSystem.tokens.colors.tokens.colors.primary[100] : DesignSystem.tokens.colors.primary[900],
      minHeight: '100vh',
      padding: DesignSystem.tokens.spacing[6],
    },
    
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: DesignSystem.tokens.spacing[8],
      ...DesignSystem.utils.responsive({
        base: { flexDirection: 'column', gap: DesignSystem.tokens.spacing[4] },
        lg: { flexDirection: 'row' },
      }),
    },
    
    title: {
      fontSize: DesignSystem.tokens.typography.fontSize['3xl'][0],
      fontWeight: DesignSystem.tokens.typography.fontWeight.bold,
      color: isDarkMode ? DesignSystem.tokens.colors.primary[50] : DesignSystem.tokens.colors.primary[900],
      display: 'flex',
      alignItems: 'center',
      gap: DesignSystem.tokens.spacing[3],
    },
    
    navigation: {
      display: 'flex',
      gap: DesignSystem.tokens.spacing[2],
      flexWrap: 'wrap' as const,
    },
    
    navButton: (active: boolean) => ({
      ...DesignSystem.components.button.variants[active ? 'primary' : 'ghost'],
      ...DesignSystem.components.button.sizes.md,
      borderRadius: DesignSystem.tokens.borderRadius.lg,
    }),
    
    grid: {
      display: 'grid',
      gap: DesignSystem.tokens.spacing[6],
      ...DesignSystem.utils.responsive({
        base: { gridTemplateColumns: '1fr' },
        md: { gridTemplateColumns: 'repeat(2, 1fr)' },
        xl: { gridTemplateColumns: 'repeat(3, 1fr)' },
      }),
    },
    
    card: {
      ...DesignSystem.components.card.base,
      ...DesignSystem.components.card.elevated,
      backgroundColor: isDarkMode ? DesignSystem.tokens.colors.primary[800] : DesignSystem.tokens.colors.primary[50],
      borderColor: isDarkMode ? DesignSystem.tokens.colors.primary[700] : DesignSystem.tokens.colors.primary[200],
    },
    
    statusIndicator: (status: string) => ({
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      display: 'inline-block',
      marginRight: DesignSystem.tokens.spacing[2],
      backgroundColor: 
        status === 'online' ? DesignSystem.tokens.colors.status.success :
        status === 'degraded' ? DesignSystem.tokens.colors.status.warning :
        status === 'offline' ? DesignSystem.tokens.colors.status.error :
        DesignSystem.tokens.colors.status.neutral,
      animation: status === 'degraded' ? DesignSystem.animations.pulse.animation : 'none',
    }),
    
    metricValue: {
      fontSize: DesignSystem.tokens.typography.fontSize['2xl'][0],
      fontWeight: DesignSystem.tokens.typography.fontWeight.bold,
      color: isDarkMode ? DesignSystem.tokens.colors.primary[50] : DesignSystem.tokens.colors.primary[900],
    },
    
    metricLabel: {
      fontSize: DesignSystem.tokens.typography.fontSize.sm[0],
      color: isDarkMode ? DesignSystem.tokens.colors.primary[400] : DesignSystem.tokens.colors.primary[600],
      marginTop: DesignSystem.tokens.spacing[1],
    },
  };

  if (isLoading) {
    return (
      <div style={styles.dashboard}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              border: `4px solid ${DesignSystem.tokens.colors.primary[200]}`,
              borderTop: `4px solid ${DesignSystem.tokens.colors.accent[500]}`,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto',
            }} />
            <p style={{ marginTop: DesignSystem.tokens.spacing[4], color: isDarkMode ? DesignSystem.tokens.colors.primary[400] : DesignSystem.tokens.colors.primary[600] }}>
              Initializing Rick's Dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Health Status Card
  const HealthStatusCard = () => (
    <div style={styles.card}>
      <h3 style={{ 
        fontSize: DesignSystem.tokens.typography.fontSize.lg[0], 
        fontWeight: DesignSystem.tokens.typography.fontWeight.semibold,
        marginBottom: DesignSystem.tokens.spacing[4],
        color: isDarkMode ? DesignSystem.tokens.colors.tokens.colors.primary[100] : DesignSystem.tokens.colors.primary[800],
      }}>
        System Health
      </h3>
      
      <div style={{ marginBottom: DesignSystem.tokens.spacing[4] }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: DesignSystem.tokens.spacing[2] }}>
          <span style={styles.statusIndicator(systemHealth?.overall || 'offline')} />
          <span style={{ 
            fontSize: DesignSystem.tokens.typography.fontSize.base[0],
            fontWeight: DesignSystem.tokens.typography.fontWeight.medium,
            textTransform: 'capitalize',
          }}>
            {systemHealth?.overall || 'Unknown'}
          </span>
        </div>
        <p style={{ 
          fontSize: DesignSystem.tokens.typography.fontSize.sm[0],
          color: isDarkMode ? DesignSystem.tokens.colors.primary[400] : DesignSystem.tokens.colors.primary[600],
        }}>
          Last updated: {systemHealth?.timestamp.toLocaleString()}
        </p>
      </div>

      <div style={{ display: 'grid', gap: DesignSystem.tokens.spacing[3] }}>
        {Object.entries(systemHealth?.components || {}).map(([name, status]) => (
          <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={styles.statusIndicator(status.status)} />
              <span style={{ 
                fontSize: DesignSystem.tokens.typography.fontSize.sm[0],
                textTransform: 'capitalize',
              }}>
                {name}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: DesignSystem.tokens.typography.fontSize.sm[0] }}>
                {status.uptime.toFixed(1)}% uptime
              </div>
              {status.responseTime && (
                <div style={{ 
                  fontSize: DesignSystem.tokens.typography.fontSize.xs[0],
                  color: isDarkMode ? DesignSystem.tokens.colors.primary[400] : DesignSystem.tokens.colors.primary[600],
                }}>
                  {status.responseTime}ms
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Agent Status Card
  const AgentStatusCard = () => (
    <div style={styles.card}>
      <h3 style={{ 
        fontSize: DesignSystem.tokens.typography.fontSize.lg[0], 
        fontWeight: DesignSystem.tokens.typography.fontWeight.semibold,
        marginBottom: DesignSystem.tokens.spacing[4],
        color: isDarkMode ? DesignSystem.tokens.colors.tokens.colors.primary[100] : DesignSystem.tokens.colors.primary[800],
      }}>
        Agent Status
      </h3>
      
      <div style={{ display: 'grid', gap: DesignSystem.tokens.spacing[4] }}>
        {agents.map((agent) => (
          <div key={agent.id} style={{ 
            padding: DesignSystem.tokens.spacing[4],
            backgroundColor: isDarkMode ? DesignSystem.tokens.colors.primary[700] : DesignSystem.tokens.colors.tokens.colors.primary[100],
            borderRadius: DesignSystem.tokens.borderRadius.md,
            border: `1px solid ${isDarkMode ? DesignSystem.tokens.colors.primary[600] : DesignSystem.tokens.colors.primary[200]}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: DesignSystem.tokens.spacing[2] }}>
              <div>
                <div style={{ 
                  fontSize: DesignSystem.tokens.typography.fontSize.base[0],
                  fontWeight: DesignSystem.tokens.typography.fontWeight.medium,
                  textTransform: 'capitalize',
                }}>
                  {agent.type} Agent
                </div>
                <div style={{ 
                  fontSize: DesignSystem.tokens.typography.fontSize.sm[0],
                  color: isDarkMode ? DesignSystem.tokens.colors.primary[400] : DesignSystem.tokens.colors.primary[600],
                }}>
                  ID: {agent.id}
                </div>
              </div>
              <span style={{
                ...DesignSystem.components.badge.variants[
                  agent.state === 'working' ? 'success' :
                  agent.state === 'failed' ? 'error' :
                  agent.state === 'blocked' ? 'warning' : 'info'
                ],
                ...DesignSystem.components.badge.base,
              }}>
                {agent.state}
              </span>
            </div>
            
            {agent.currentTask && (
              <div style={{ 
                fontSize: DesignSystem.tokens.typography.fontSize.sm[0],
                marginBottom: DesignSystem.tokens.spacing[3],
                fontStyle: 'italic',
              }}>
                Current: {agent.currentTask}
              </div>
            )}
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: DesignSystem.tokens.spacing[2] }}>
              <div style={{ textAlign: 'center' }}>
                <div style={styles.metricValue}>{agent.performance.tasksCompleted}</div>
                <div style={styles.metricLabel}>Tasks</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={styles.metricValue}>{(agent.performance.successRate * 100).toFixed(1)}%</div>
                <div style={styles.metricLabel}>Success</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={styles.metricValue}>{agent.performance.avgResponseTime}s</div>
                <div style={styles.metricLabel}>Avg Time</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Performance Metrics Card
  const PerformanceMetricsCard = () => (
    <div style={styles.card}>
      <h3 style={{ 
        fontSize: DesignSystem.tokens.typography.fontSize.lg[0], 
        fontWeight: DesignSystem.tokens.typography.fontWeight.semibold,
        marginBottom: DesignSystem.tokens.spacing[4],
        color: isDarkMode ? DesignSystem.tokens.colors.tokens.colors.primary[100] : DesignSystem.tokens.colors.primary[800],
      }}>
        Performance Metrics
      </h3>
      
      <div style={{ display: 'grid', gap: DesignSystem.tokens.spacing[4] }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: DesignSystem.tokens.spacing[4] }}>
          <div style={{ textAlign: 'center' }}>
            <div style={styles.metricValue}>{workflows.length}</div>
            <div style={styles.metricLabel}>Active Workflows</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={styles.metricValue}>
              {workflows.filter(w => w.success).length}/{workflows.length}
            </div>
            <div style={styles.metricLabel}>Success Rate</div>
          </div>
        </div>
        
        <div>
          <h4 style={{ 
            fontSize: DesignSystem.tokens.typography.fontSize.base[0],
            fontWeight: DesignSystem.tokens.typography.fontWeight.medium,
            marginBottom: DesignSystem.tokens.spacing[3],
          }}>
            Recent Workflows
          </h4>
          <div style={{ display: 'grid', gap: DesignSystem.tokens.spacing[2] }}>
            {workflows.slice(0, 5).map((workflow) => (
              <div key={workflow.workflowId} style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: DesignSystem.tokens.spacing[2],
                backgroundColor: isDarkMode ? DesignSystem.tokens.colors.primary[700] : DesignSystem.tokens.colors.tokens.colors.primary[100],
                borderRadius: DesignSystem.tokens.borderRadius.sm,
              }}>
                <div>
                  <div style={{ fontSize: DesignSystem.tokens.typography.fontSize.sm[0] }}>
                    {workflow.taskType}
                  </div>
                  <div style={{ 
                    fontSize: DesignSystem.tokens.typography.fontSize.xs[0],
                    color: isDarkMode ? DesignSystem.tokens.colors.primary[400] : DesignSystem.tokens.colors.primary[600],
                  }}>
                    {workflow.platform}
                  </div>
                </div>
                <span style={{
                  ...DesignSystem.components.badge.variants[workflow.success ? 'success' : 'error'],
                  ...DesignSystem.components.badge.base,
                }}>
                  {workflow.success ? 'Success' : 'Failed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Self-Healing Controls Card
  const HealingControlsCard = () => (
    <div style={styles.card}>
      <h3 style={{ 
        fontSize: DesignSystem.tokens.typography.fontSize.lg[0], 
        fontWeight: DesignSystem.tokens.typography.fontWeight.semibold,
        marginBottom: DesignSystem.tokens.spacing[4],
        color: isDarkMode ? DesignSystem.tokens.colors.tokens.colors.primary[100] : DesignSystem.tokens.colors.primary[800],
      }}>
        Self-Healing Controls
      </h3>
      
      <div style={{ marginBottom: DesignSystem.tokens.spacing[4] }}>
        <p style={{ 
          fontSize: DesignSystem.tokens.typography.fontSize.sm[0],
          color: isDarkMode ? DesignSystem.tokens.colors.primary[400] : DesignSystem.tokens.colors.primary[600],
          marginBottom: DesignSystem.tokens.spacing[4],
        }}>
          Execute healing commands via Telegram. Send these commands to your bot:
        </p>
        
        <div style={{ display: 'grid', gap: DesignSystem.tokens.spacing[2] }}>
          {[
            { command: '/heal diagnose_system', description: 'Run system health check' },
            { command: '/heal restart_gateway', description: 'Restart gateway service' },
            { command: '/heal clear_memory_cache', description: 'Clear memory cache' },
            { command: '/heal check_models', description: 'Check NVIDIA models' },
            { command: '/heal backup_data', description: 'Create system backup' },
          ].map((item) => (
            <div key={item.command} style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: DesignSystem.tokens.spacing[3],
              backgroundColor: isDarkMode ? DesignSystem.tokens.colors.primary[700] : DesignSystem.tokens.tokens.colors.primary[100],
              borderRadius: DesignSystem.tokens.borderRadius.md,
              border: `1px solid ${isDarkMode ? DesignSystem.tokens.colors.primary[600] : DesignSystem.tokens.colors.primary[200]}`,
            }}>
              <div>
                <div style={{ 
                  fontSize: DesignSystem.tokens.typography.fontSize.sm[0],
                  fontWeight: DesignSystem.tokens.typography.fontWeight.medium,
                  fontFamily: DesignSystem.tokens.typography.fontFamily.mono.join(', '),
                }}>
                  {item.command}
                </div>
                <div style={{ 
                  fontSize: DesignSystem.tokens.typography.fontSize.xs[0],
                  color: isDarkMode ? DesignSystem.tokens.colors.primary[400] : DesignSystem.tokens.colors.primary[600],
                }}>
                  {item.description}
                </div>
              </div>
              <button style={{
                ...DesignSystem.components.button.variants.ghost,
                ...DesignSystem.components.button.sizes.sm,
                padding: DesignSystem.tokens.spacing[2],
              }}>
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {systemHealth?.recoveryActions && systemHealth.recoveryActions.length > 0 && (
        <div>
          <h4 style={{ 
            fontSize: DesignSystem.tokens.typography.fontSize.base[0],
            fontWeight: DesignSystem.tokens.typography.fontWeight.medium,
            marginBottom: DesignSystem.tokens.spacing[3],
          }}>
            Recent Recovery Actions
          </h4>
          <div style={{ display: 'grid', gap: DesignSystem.tokens.spacing[2] }}>
            {systemHealth.recoveryActions.map((action, index) => (
              <div key={index} style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: DesignSystem.tokens.spacing[2],
                padding: DesignSystem.tokens.spacing[2],
                backgroundColor: DesignSystem.tokens.colors.status.success + '20',
                borderRadius: DesignSystem.tokens.borderRadius.sm,
                border: `1px solid ${DesignSystem.tokens.colors.status.success}40`,
              }}>
                <span style={{ color: DesignSystem.tokens.colors.status.success }}>✓</span>
                <span style={{ fontSize: DesignSystem.tokens.typography.fontSize.sm[0] }}>
                  {action}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.title}>
          <span style={{ fontSize: '2rem' }}>🚀</span>
          <span>OpenClaw Rick Dashboard</span>
        </div>
        
        <nav style={styles.navigation}>
          {['overview', 'agents', 'workflows', 'healing'].map((view) => (
            <button
              key={view}
              style={styles.navButton(selectedView === view)}
              onClick={() => setSelectedView(view as any)}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
          
          <button
            style={{
              ...DesignSystem.components.button.variants.ghost,
              ...DesignSystem.components.button.sizes.md,
              marginLeft: DesignSystem.tokens.spacing[4],
            }}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {selectedView === 'overview' && (
          <div style={styles.grid}>
            <HealthStatusCard />
            <AgentStatusCard />
            <PerformanceMetricsCard />
          </div>
        )}
        
        {selectedView === 'agents' && (
          <div style={styles.grid}>
            <div style={{ gridColumn: '1 / -1' }}>
              <AgentStatusCard />
            </div>
          </div>
        )}
        
        {selectedView === 'workflows' && (
          <div style={styles.grid}>
            <div style={{ gridColumn: '1 / -1' }}>
              <PerformanceMetricsCard />
            </div>
          </div>
        )}
        
        {selectedView === 'healing' && (
          <div style={styles.grid}>
            <HealingControlsCard />
            <HealthStatusCard />
          </div>
        )}
      </main>
    </div>
  );
};

export default RickDashboard;
