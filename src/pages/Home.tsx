/**
 * Lyzr Outreach V2.0 - Enterprise Multi-Agent Campaign Platform
 *
 * Complete 24-agent orchestration with:
 * - Workspace Management
 * - Enhanced ICP Configuration (Clay-level detail)
 * - Apollo Leads Dashboard
 * - Bulk Campaign Builder
 * - Fixed Vibe Check Rewrite
 * - Reconfigurable Waterfall
 * - Digital Twin Dashboard
 * - LinkedIn Monitor Feed
 * - Automation Workflows
 *
 * NO emojis, NO toast/sonner, uses lucide-react icons ONLY
 */

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Activity,
  Zap,
  TrendingUp,
  Send,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Plus,
  Play,
  Filter,
  Download,
  Upload,
  FileText,
  Edit,
  Trash2,
  Eye,
  Mail,
  DollarSign,
  Users,
  Target,
  Database,
  Settings,
  BarChart,
  Calendar,
  Clock,
  Star,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Brain,
  Loader2,
  UserPlus,
  Linkedin,
  Home as HomeIcon,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  GripVertical,
  Copy,
  ArrowRight,
  Bell,
  Save,
  Pause,
  LayoutDashboard,
  ListChecks,
  Workflow
} from 'lucide-react'
import { callAIAgent } from '@/utils/aiAgent'
import type { NormalizedAgentResponse } from '@/utils/aiAgent'
import { cn } from '@/lib/utils'

// =============================================================================
// AGENT IDs - ALL 24 AGENTS
// =============================================================================

const AGENT_IDS = {
  // Core 18 Agents
  MISSION_CONTROLLER: '697ca914066158e77fde4351',
  SIGNAL_PROCESSING_MANAGER: '697ca8c55e4abfa0b0e16af6',
  ENRICHMENT_AGENT: '697ca7597601d4aab0edc20b',
  DEEP_RESEARCH_AGENT: '697ca76a5e4abfa0b0e16aa4',
  INTENT_SCORING_AGENT: '697ca77e5e4abfa0b0e16aae',
  MEMO_SYNTHESIS_AGENT: '697ca79a7601d4aab0edc237',
  OUTREACH_MANAGER: '697ca8de066158e77fde4347',
  MESSAGE_WRITER_AGENT: '697ca7d87601d4aab0edc24a',
  CLAWDBOT_VIBE_CHECKER: '697ca7edd36f070193f5bd3f',
  CREATIVE_STRATEGIST_AGENT: '697ca803066158e77fde4335',
  SAFETY_MANAGER: '697ca8f47601d4aab0edc279',
  SYSTEM_SENTINEL: '697ca81ad36f070193f5bd4e',
  HUBSPOT_SYNC_AGENT: '697ca8305e4abfa0b0e16ae0',
  WRITING_STYLE_ANALYZER: '697ca8475e4abfa0b0e16ae4',
  ICP_GENERATION_AGENT: '697ca85c7601d4aab0edc266',
  LINKEDIN_DELIVERY_AGENT: '697ca86ed36f070193f5bd58',
  INSTANTLY_AI_FAILOVER: '697ca8815e4abfa0b0e16aec',
  RESPONSE_CLASSIFIER_AGENT: '697ca896066158e77fde4343',
  MEETING_SCHEDULER_AGENT: '697ca8abd36f070193f5bd59',
  // New 6 Autonomous Agents
  PERPLEXITY_RESEARCH: '697cc3a45e4abfa0b0e16db1',
  CLAY_ENRICHMENT: '697cc3bd5e4abfa0b0e16db2',
  GOOGLE_CALENDAR_SYNC: '697cc3d35e4abfa0b0e16db7',
  DIGITAL_TWIN_LINKEDIN: '697cc40d7601d4aab0edc562',
  LINKEDIN_MONITOR: '697cc424d36f070193f5c022',
  MOLTBOT_AUTOMATION: '697cc439066158e77fde4634'
} as const

// =============================================================================
// Color Palette - Lyzr Design System
// =============================================================================

const COLORS = {
  lyzrBlack: '#27272A',
  whiteAmber: '#F3EFEA',
  lyzrFerra: '#71514F',
  congoBrown: '#4A2F2D'
}

// =============================================================================
// TypeScript Interfaces
// =============================================================================

// Perplexity Research Agent
interface PerplexityResearchResult {
  research_summary: string
  key_findings: string[]
  competitive_landscape: string
  strategic_opportunities: string
  data_sources: string[]
}

// Digital Twin LinkedIn Agent
interface DigitalTwinResult {
  action_taken: string
  connection_status: string
  engagement_type: string
  personalized_message: string
  connection_quality_score: string
}

// LinkedIn Monitor Agent
interface LinkedInMonitorResult {
  signal_detected: boolean
  signal_type: string | null
  icp_name: string
  icp_company: string
  opportunity_score: number
  suggested_response: string
  engagement_rationale: string
}

// MoltBot Automation Agent
interface MoltBotResult {
  workflow_name: string
  status: string
  records_processed: number
  errors: any[]
  sync_summary: {
    created: number
    updated: number
    duplicates_merged: number
  }
  next_scheduled_run: string | null
}

// Vibe Checker Result
interface Violation {
  type: string
  detail: string
}

interface VibeCheckerResult {
  verdict: string
  violations: Violation[]
  style_dna_match_score: string
  recommendations: string[]
  audit_summary: string
}

// Message Writer Result
interface MessageWriterResult {
  message_draft: string
  word_count: number
  style_dna_applied: any[]
  value_nugget_referenced: string
  tone_assessment: string
}

// ICP Configuration
interface ICPConfig {
  industries: string[]
  companySize: string[]
  revenueRange: string[]
  jobTitles: string[]
  techStack: string[]
  fundingStage: string[]
  geography: string[]
}

// Apollo Lead
interface ApolloLead {
  id: string
  firstName: string
  lastName: string
  jobTitle: string
  company: string
  workEmail: string
  linkedinUrl: string
  insights: string
  enrichmentStatus: 'complete' | 'partial' | 'failed'
  selected: boolean
}

// Waterfall Step
interface WaterfallStep {
  id: string
  channel: 'LinkedIn DM' | 'Email' | 'LinkedIn Comment' | 'Follow-up Email'
  delay: number
  fallbackCondition: string
  order: number
}

// Team Member
interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  integrations: {
    gmail: 'connected' | 'disconnected' | 'pending'
    calendly: 'connected' | 'disconnected' | 'pending'
    linkedin: 'connected' | 'disconnected' | 'pending'
  }
}

// LinkedIn Signal
interface LinkedInSignal {
  id: string
  type: 'job_change' | 'pain_point_post' | 'content_engagement' | 'company_announcement' | 'asking_recommendations'
  icpName: string
  icpCompany: string
  opportunityScore: number
  rationale: string
  suggestedResponse: string
  timestamp: string
}

// Automation Workflow
interface AutomationWorkflow {
  id: string
  name: string
  description: string
  trigger: string
  actions: string[]
  schedule: string
  status: 'active' | 'paused' | 'draft'
  lastRun: string | null
  nextRun: string | null
}

// =============================================================================
// Mock Data
// =============================================================================

const INDUSTRIES = [
  'SaaS', 'Enterprise Software', 'Cloud Infrastructure', 'DevOps Tools', 'Cybersecurity',
  'AI/ML', 'Data Analytics', 'API Platforms', 'FinTech', 'Banking', 'Insurance',
  'Investment Management', 'Payments', 'Lending', 'HealthTech', 'Telemedicine',
  'Medical Devices', 'Pharma', 'Healthcare IT', 'D2C Brands', 'Marketplaces',
  'Retail Tech', 'Supply Chain', 'Consulting', 'Legal Tech', 'Accounting',
  'Marketing Agencies', 'Industrial IoT', 'Automation', 'Logistics', 'PropTech',
  'Commercial Real Estate', 'Property Management', 'EdTech', 'Higher Education',
  'Corporate Training', 'AdTech', 'Content Platforms', 'Streaming', 'Gaming'
]

const COMPANY_SIZES = [
  'Micro (1-10)', 'Small (11-50)', 'Medium (51-200)', 'Growth (201-500)',
  'Mid-Market (501-1000)', 'Enterprise (1001-5000)', 'Large Enterprise (5000+)'
]

const REVENUE_RANGES = [
  'Seed (<$1M ARR)', 'Early Growth ($1M-$5M)', 'Growth ($5M-$20M)',
  'Scale ($20M-$100M)', 'Enterprise ($100M+)'
]

const JOB_TITLES = [
  'CEO', 'CTO', 'COO', 'CMO', 'CFO', 'VP of Engineering', 'VP of Sales',
  'VP of Marketing', 'Head of Engineering', 'Engineering Manager', 'DevOps Lead',
  'Platform Engineer', 'Solutions Architect', 'Tech Lead', 'CPO', 'VP Product',
  'Head of Product', 'Product Manager', 'Product Owner', 'CRO', 'VP Sales',
  'Sales Director', 'Head of Sales Development', 'SDR Manager', 'VP Marketing',
  'Head of Demand Gen', 'Marketing Director', 'Growth Marketing Lead',
  'VP Operations', 'Operations Manager', 'Business Operations Lead',
  'Chief Customer Officer', 'VP CS', 'CS Director', 'Customer Success Manager'
]

const TECH_STACK = [
  'AWS', 'GCP', 'Azure', 'DigitalOcean', 'Heroku', 'Python', 'JavaScript',
  'TypeScript', 'Go', 'Java', 'Ruby', 'PHP', 'React', 'Vue', 'Angular',
  'Node.js', 'Django', 'Rails', 'Spring', 'PostgreSQL', 'MongoDB', 'MySQL',
  'Redis', 'Elasticsearch', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins',
  'GitHub Actions', 'Salesforce', 'HubSpot', 'Pipedrive', 'Copper', 'Slack',
  'Microsoft Teams', 'Zoom', 'Google Workspace'
]

const FUNDING_STAGES = [
  'Bootstrapped', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Public'
]

const GEOGRAPHIES = [
  'USA', 'Canada', 'UK', 'Germany', 'France', 'Netherlands', 'Spain', 'Nordics',
  'India', 'Singapore', 'Australia', 'Japan', 'Brazil', 'Mexico', 'Argentina'
]

const MOCK_APOLLO_LEADS: ApolloLead[] = [
  {
    id: 'lead-1',
    firstName: 'Sarah',
    lastName: 'Chen',
    jobTitle: 'VP of Engineering',
    company: 'TechCorp Industries',
    workEmail: 'sarah.chen@techcorp.com',
    linkedinUrl: 'https://linkedin.com/in/sarahchen',
    insights: 'Recently posted about scaling infrastructure challenges',
    enrichmentStatus: 'complete',
    selected: false
  },
  {
    id: 'lead-2',
    firstName: 'Marcus',
    lastName: 'Thompson',
    jobTitle: 'CTO',
    company: 'Global Solutions Ltd',
    workEmail: 'marcus.t@globalsolutions.com',
    linkedinUrl: 'https://linkedin.com/in/marcusthompson',
    insights: 'Company announced $50M Series B funding',
    enrichmentStatus: 'complete',
    selected: false
  },
  {
    id: 'lead-3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    jobTitle: 'Head of Product',
    company: 'Innovation Partners',
    workEmail: 'emily.r@innovationpartners.com',
    linkedinUrl: 'https://linkedin.com/in/emilyrodriguez',
    insights: 'Engaging with DevOps content frequently',
    enrichmentStatus: 'partial',
    selected: false
  }
]

const MOCK_LINKEDIN_SIGNALS: LinkedInSignal[] = [
  {
    id: 'signal-1',
    type: 'job_change',
    icpName: 'John Smith',
    icpCompany: 'Acme Corp',
    opportunityScore: 85,
    rationale: 'New role as VP Engineering - likely building out team and evaluating tools',
    suggestedResponse: 'Congrats on the new role! Bet you\'re building out the team - happy to share what worked for similar companies your size.',
    timestamp: '2 hours ago'
  },
  {
    id: 'signal-2',
    type: 'pain_point_post',
    icpName: 'Lisa Wang',
    icpCompany: 'DataFlow Inc',
    opportunityScore: 78,
    rationale: 'Posted about struggling with deployment automation - direct pain point match',
    suggestedResponse: 'Saw your post about deployment challenges. We\'ve helped teams cut deploy time by 60% - worth a chat?',
    timestamp: '5 hours ago'
  },
  {
    id: 'signal-3',
    type: 'content_engagement',
    icpName: 'David Park',
    icpCompany: 'Enterprise Systems Co',
    opportunityScore: 92,
    rationale: 'Engaged with 3 posts about cloud migration in past week',
    suggestedResponse: 'Noticed you\'re researching cloud migration. We just helped a similar enterprise reduce costs by 40% - interested in the playbook?',
    timestamp: '1 day ago'
  }
]

const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Alex Johnson',
    role: 'Sales Lead',
    avatar: 'AJ',
    integrations: {
      gmail: 'connected',
      calendly: 'connected',
      linkedin: 'connected'
    }
  },
  {
    id: 'member-2',
    name: 'Maria Garcia',
    role: 'Account Executive',
    avatar: 'MG',
    integrations: {
      gmail: 'connected',
      calendly: 'pending',
      linkedin: 'connected'
    }
  },
  {
    id: 'member-3',
    name: 'Kevin Liu',
    role: 'SDR',
    avatar: 'KL',
    integrations: {
      gmail: 'disconnected',
      calendly: 'connected',
      linkedin: 'connected'
    }
  }
]

const MOCK_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: 'workflow-1',
    name: 'Clay to HubSpot Auto-Sync',
    description: 'Automatically sync enriched leads from Clay to HubSpot CRM',
    trigger: 'New lead enriched in Clay',
    actions: ['Enrich contact data', 'Create HubSpot contact', 'Set lead score'],
    schedule: 'Every 15 minutes',
    status: 'active',
    lastRun: '10 minutes ago',
    nextRun: '5 minutes'
  },
  {
    id: 'workflow-2',
    name: 'Lead Enrichment Trigger',
    description: 'Trigger waterfall enrichment when new Apollo lead added',
    trigger: 'New Apollo lead',
    actions: ['Clay enrichment', 'Perplexity research', 'Intent scoring'],
    schedule: 'Real-time',
    status: 'active',
    lastRun: '1 hour ago',
    nextRun: 'Continuous'
  },
  {
    id: 'workflow-3',
    name: 'Duplicate Detection & Merge',
    description: 'Identify and merge duplicate contacts across systems',
    trigger: 'Daily at 2 AM',
    actions: ['Scan for duplicates', 'Merge records', 'Update references'],
    schedule: 'Daily 2:00 AM',
    status: 'active',
    lastRun: 'Yesterday',
    nextRun: 'Tomorrow 2:00 AM'
  }
]

// =============================================================================
// SUB-COMPONENTS - Defined outside Home() to prevent re-creation
// =============================================================================

function WorkspaceManagement() {
  const [members, setMembers] = useState(MOCK_TEAM_MEMBERS)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Workspace Management</h2>
          <p className="text-sm text-gray-400">Manage team members and integrations</p>
        </div>
        <Button className="bg-[#71514F] hover:bg-[#4A2F2D] text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.id} className="bg-[#F3EFEA] border-gray-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-[#71514F] rounded-full flex items-center justify-center text-white font-bold">
                    {member.avatar}
                  </div>
                  <div>
                    <CardTitle className="text-[#27272A]">{member.name}</CardTitle>
                    <CardDescription className="text-[#4A2F2D]">{member.role}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 text-[#71514F]" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label className="text-xs text-[#4A2F2D]">Integrations</Label>

                <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-300">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-[#27272A]">Gmail</span>
                  </div>
                  <Badge
                    className={cn(
                      'text-xs',
                      member.integrations.gmail === 'connected' && 'bg-green-500',
                      member.integrations.gmail === 'disconnected' && 'bg-red-500',
                      member.integrations.gmail === 'pending' && 'bg-yellow-500'
                    )}
                  >
                    {member.integrations.gmail}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-[#27272A]">Calendly</span>
                  </div>
                  <Badge
                    className={cn(
                      'text-xs',
                      member.integrations.calendly === 'connected' && 'bg-green-500',
                      member.integrations.calendly === 'disconnected' && 'bg-red-500',
                      member.integrations.calendly === 'pending' && 'bg-yellow-500'
                    )}
                  >
                    {member.integrations.calendly}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-300">
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-[#27272A]">LinkedIn</span>
                  </div>
                  <Badge
                    className={cn(
                      'text-xs',
                      member.integrations.linkedin === 'connected' && 'bg-green-500',
                      member.integrations.linkedin === 'disconnected' && 'bg-red-500',
                      member.integrations.linkedin === 'pending' && 'bg-yellow-500'
                    )}
                  >
                    {member.integrations.linkedin}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full border-[#71514F] text-[#71514F]">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function EnhancedICPConfig() {
  const [icpConfig, setIcpConfig] = useState<ICPConfig>({
    industries: [],
    companySize: [],
    revenueRange: [],
    jobTitles: [],
    techStack: [],
    fundingStage: [],
    geography: []
  })
  const [loading, setLoading] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const handleGenerateICP = async () => {
    setLoading(true)
    try {
      await callAIAgent(
        `Generate ICP with: ${JSON.stringify(icpConfig)}`,
        AGENT_IDS.ICP_GENERATION_AGENT
      )
    } catch (error) {
      console.error('ICP generation error:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const toggleSelection = (category: keyof ICPConfig, value: string) => {
    setIcpConfig(prev => {
      const current = prev[category] as string[]
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      return { ...prev, [category]: updated }
    })
  }

  const SelectionSection = ({
    title,
    category,
    options
  }: {
    title: string
    category: keyof ICPConfig
    options: string[]
  }) => {
    const isExpanded = expandedSection === category
    const selectedCount = (icpConfig[category] as string[]).length

    return (
      <Card className="bg-[#F3EFEA] border-gray-700">
        <CardHeader
          className="cursor-pointer"
          onClick={() => toggleSection(category)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm text-[#27272A]">{title}</CardTitle>
              {selectedCount > 0 && (
                <Badge className="bg-[#71514F]">{selectedCount} selected</Badge>
              )}
            </div>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent className="max-h-64 overflow-y-auto">
            <div className="space-y-2">
              {options.map((option) => (
                <div key={option} className="flex items-center gap-2">
                  <Checkbox
                    id={`${category}-${option}`}
                    checked={(icpConfig[category] as string[]).includes(option)}
                    onCheckedChange={() => toggleSelection(category, option)}
                  />
                  <Label
                    htmlFor={`${category}-${option}`}
                    className="text-sm text-[#27272A] cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Enhanced ICP Configuration</h2>
          <p className="text-sm text-gray-400">Clay-level detail for precise targeting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-[#71514F] text-[#71514F]">
            <Download className="h-4 w-4 mr-2" />
            Load Template
          </Button>
          <Button className="bg-[#71514F] hover:bg-[#4A2F2D] text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SelectionSection title="Industries (50+ options)" category="industries" options={INDUSTRIES} />
        <SelectionSection title="Company Size" category="companySize" options={COMPANY_SIZES} />
        <SelectionSection title="Revenue Range" category="revenueRange" options={REVENUE_RANGES} />
        <SelectionSection title="Job Titles by Department" category="jobTitles" options={JOB_TITLES} />
        <SelectionSection title="Tech Stack (50+ technologies)" category="techStack" options={TECH_STACK} />
        <SelectionSection title="Funding Stage" category="fundingStage" options={FUNDING_STAGES} />
        <SelectionSection title="Geography" category="geography" options={GEOGRAPHIES} />
      </div>

      <Card className="bg-[#F3EFEA] border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#27272A]">Selected Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(icpConfig).map(([category, values]) =>
              (values as string[]).map((value) => (
                <Badge
                  key={`${category}-${value}`}
                  variant="outline"
                  className="border-[#71514F] text-[#71514F]"
                >
                  {value}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => toggleSelection(category as keyof ICPConfig, value)}
                  />
                </Badge>
              ))
            )}
            {Object.values(icpConfig).every(v => v.length === 0) && (
              <p className="text-sm text-[#4A2F2D]">No criteria selected</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-[#71514F] hover:bg-[#4A2F2D] text-white"
            onClick={handleGenerateICP}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating ICP...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Generate ICP
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function ApolloLeadsDashboard() {
  const [leads, setLeads] = useState(MOCK_APOLLO_LEADS)
  const [loading, setLoading] = useState(false)
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(leads.map(l => l.id))
    } else {
      setSelectedLeads([])
    }
  }

  const handleSelectLead = (leadId: string, checked: boolean) => {
    if (checked) {
      setSelectedLeads(prev => [...prev, leadId])
    } else {
      setSelectedLeads(prev => prev.filter(id => id !== leadId))
    }
  }

  const handleEnrichWithClay = async () => {
    setLoading(true)
    try {
      await callAIAgent(
        `Enrich leads: ${selectedLeads.join(', ')}`,
        AGENT_IDS.CLAY_ENRICHMENT
      )
    } catch (error) {
      console.error('Enrichment error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Apollo Leads Dashboard</h2>
          <p className="text-sm text-gray-400">Pull and manage leads with enrichment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-[#71514F] text-[#71514F]">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button className="bg-[#71514F] hover:bg-[#4A2F2D] text-white">
            <Search className="h-4 w-4 mr-2" />
            Fetch Leads
          </Button>
        </div>
      </div>

      {selectedLeads.length > 0 && (
        <Card className="bg-[#F3EFEA] border-blue-500">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#27272A]">
                {selectedLeads.length} lead(s) selected
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#71514F] text-[#71514F]"
                  onClick={handleEnrichWithClay}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Database className="h-4 w-4 mr-2" />
                  )}
                  Enrich with Clay
                </Button>
                <Button variant="outline" size="sm" className="border-[#71514F] text-[#71514F]">
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Campaign
                </Button>
                <Button variant="outline" size="sm" className="border-[#71514F] text-[#71514F]">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-[#F3EFEA] border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedLeads.length === leads.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="text-[#27272A]">First Name</TableHead>
              <TableHead className="text-[#27272A]">Last Name</TableHead>
              <TableHead className="text-[#27272A]">Job Title</TableHead>
              <TableHead className="text-[#27272A]">Company</TableHead>
              <TableHead className="text-[#27272A]">Work Email</TableHead>
              <TableHead className="text-[#27272A]">LinkedIn</TableHead>
              <TableHead className="text-[#27272A]">Insights</TableHead>
              <TableHead className="text-[#27272A]">Status</TableHead>
              <TableHead className="text-[#27272A]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedLeads.includes(lead.id)}
                    onCheckedChange={(checked) => handleSelectLead(lead.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="text-[#27272A]">{lead.firstName}</TableCell>
                <TableCell className="text-[#27272A]">{lead.lastName}</TableCell>
                <TableCell className="text-[#27272A]">{lead.jobTitle}</TableCell>
                <TableCell className="text-[#27272A]">{lead.company}</TableCell>
                <TableCell className="text-[#27272A] text-xs">{lead.workEmail}</TableCell>
                <TableCell>
                  <a href={lead.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 text-blue-600" />
                  </a>
                </TableCell>
                <TableCell className="text-[#4A2F2D] text-xs max-w-xs truncate">
                  {lead.insights}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      'text-xs',
                      lead.enrichmentStatus === 'complete' && 'bg-green-500',
                      lead.enrichmentStatus === 'partial' && 'bg-yellow-500',
                      lead.enrichmentStatus === 'failed' && 'bg-red-500'
                    )}
                  >
                    {lead.enrichmentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

function BulkCampaignBuilder() {
  const [step, setStep] = useState(1)
  const [campaignName, setCampaignName] = useState('')
  const [strategicLens, setStrategicLens] = useState<'efficiency' | 'growth' | 'disruptor'>('efficiency')
  const [waterfallSteps, setWaterfallSteps] = useState<WaterfallStep[]>([
    { id: '1', channel: 'LinkedIn DM', delay: 0, fallbackCondition: 'No response in 3 days', order: 1 },
    { id: '2', channel: 'Email', delay: 3, fallbackCondition: 'No response in 5 days', order: 2 },
    { id: '3', channel: 'Follow-up Email', delay: 5, fallbackCondition: '', order: 3 }
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Bulk Campaign Builder</h2>
          <p className="text-sm text-gray-400">Create personalized campaigns at scale</p>
        </div>
        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
          Step {step} of 3
        </Badge>
      </div>

      <div className="flex items-center justify-center gap-4 mb-8">
        <div className={cn(
          'flex items-center justify-center h-10 w-10 rounded-full text-sm font-bold',
          step >= 1 ? 'bg-[#71514F] text-white' : 'bg-gray-600 text-gray-300'
        )}>
          1
        </div>
        <div className={cn('h-1 w-24', step >= 2 ? 'bg-[#71514F]' : 'bg-gray-600')} />
        <div className={cn(
          'flex items-center justify-center h-10 w-10 rounded-full text-sm font-bold',
          step >= 2 ? 'bg-[#71514F] text-white' : 'bg-gray-600 text-gray-300'
        )}>
          2
        </div>
        <div className={cn('h-1 w-24', step >= 3 ? 'bg-[#71514F]' : 'bg-gray-600')} />
        <div className={cn(
          'flex items-center justify-center h-10 w-10 rounded-full text-sm font-bold',
          step >= 3 ? 'bg-[#71514F] text-white' : 'bg-gray-600 text-gray-300'
        )}>
          3
        </div>
      </div>

      {step === 1 && (
        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#27272A]">Step 1: Select Leads</CardTitle>
            <CardDescription className="text-[#4A2F2D]">
              Import from Apollo or upload CSV
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Card className="cursor-pointer hover:border-[#71514F] transition-all border-2">
                <CardContent className="p-6 text-center">
                  <Database className="h-12 w-12 mx-auto mb-3 text-blue-500" />
                  <div className="font-semibold text-sm text-[#27272A]">Import from Apollo</div>
                  <p className="text-xs text-[#4A2F2D] mt-1">247 leads available</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:border-[#71514F] transition-all border-2">
                <CardContent className="p-6 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-3 text-green-500" />
                  <div className="font-semibold text-sm text-[#27272A]">Upload CSV</div>
                  <p className="text-xs text-[#4A2F2D] mt-1">Browse files</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:border-[#71514F] transition-all border-2">
                <CardContent className="p-6 text-center">
                  <Edit className="h-12 w-12 mx-auto mb-3 text-purple-500" />
                  <div className="font-semibold text-sm text-[#27272A]">Manual Entry</div>
                  <p className="text-xs text-[#4A2F2D] mt-1">Add one by one</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#71514F] hover:bg-[#4A2F2D] text-white" onClick={() => setStep(2)}>
              Next: Personalization
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#27272A]">Step 2: Personalization Settings</CardTitle>
            <CardDescription className="text-[#4A2F2D]">
              Configure campaign strategy and message templates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#27272A]">Campaign Name</Label>
              <Input
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g., Q1 Enterprise Outreach"
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#27272A]">Strategic Lens</Label>
              <div className="grid grid-cols-3 gap-3">
                <Card
                  className={cn(
                    'cursor-pointer transition-all border-2',
                    strategicLens === 'efficiency' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600'
                  )}
                  onClick={() => setStrategicLens('efficiency')}
                >
                  <CardContent className="p-4 text-center">
                    <DollarSign className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <div className="font-semibold text-sm text-[#27272A]">Efficiency</div>
                  </CardContent>
                </Card>

                <Card
                  className={cn(
                    'cursor-pointer transition-all border-2',
                    strategicLens === 'growth' ? 'border-green-500 bg-green-500/10' : 'border-gray-600'
                  )}
                  onClick={() => setStrategicLens('growth')}
                >
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div className="font-semibold text-sm text-[#27272A]">Growth</div>
                  </CardContent>
                </Card>

                <Card
                  className={cn(
                    'cursor-pointer transition-all border-2',
                    strategicLens === 'disruptor' ? 'border-purple-500 bg-purple-500/10' : 'border-gray-600'
                  )}
                  onClick={() => setStrategicLens('disruptor')}
                >
                  <CardContent className="p-4 text-center">
                    <Sparkles className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <div className="font-semibold text-sm text-[#27272A]">Disruptor</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#27272A]">Message Template</Label>
              <Textarea
                placeholder="Hi {{first_name}}, noticed {{company}} is {{pain_point}}..."
                className="min-h-[120px] bg-white"
              />
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs cursor-pointer">first_name</Badge>
                <Badge variant="outline" className="text-xs cursor-pointer">company</Badge>
                <Badge variant="outline" className="text-xs cursor-pointer">pain_point</Badge>
                <Badge variant="outline" className="text-xs cursor-pointer">role</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button className="flex-1 bg-[#71514F] hover:bg-[#4A2F2D] text-white" onClick={() => setStep(3)}>
              Next: Channel Waterfall
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#27272A]">Step 3: Channel Waterfall</CardTitle>
            <CardDescription className="text-[#4A2F2D]">
              Configure multi-channel sequence with fallback rules
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {waterfallSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-300">
                <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                <div className="flex items-center justify-center h-8 w-8 bg-[#71514F] text-white rounded-full text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs text-[#4A2F2D]">Channel</Label>
                    <p className="font-medium text-sm text-[#27272A]">{step.channel}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-[#4A2F2D]">Delay</Label>
                    <p className="font-medium text-sm text-[#27272A]">{step.delay} days</p>
                  </div>
                  <div>
                    <Label className="text-xs text-[#4A2F2D]">Fallback</Label>
                    <p className="font-medium text-sm text-[#27272A]">{step.fallbackCondition || 'None'}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full border-[#71514F] text-[#71514F]">
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              <Play className="h-4 w-4 mr-2" />
              Launch Campaign
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

function VibeCheckRewrite() {
  const [draft, setDraft] = useState('Hi Sarah - noticed TechCorp\'s been exploring pricing options. We\'ve helped similar enterprises cut implementation time by 40%. Worth a quick chat?')
  const [feedback, setFeedback] = useState('')
  const [draftVersion, setDraftVersion] = useState(1)
  const [loading, setLoading] = useState(false)
  const [rewriting, setRewriting] = useState(false)
  const [vibeCheckResult, setVibeCheckResult] = useState<VibeCheckerResult | null>(null)

  const handleVibeCheck = async () => {
    setLoading(true)
    try {
      const result = await callAIAgent(draft, AGENT_IDS.CLAWDBOT_VIBE_CHECKER)
      if (result.response.result) {
        setVibeCheckResult(result.response.result as VibeCheckerResult)
      }
    } catch (error) {
      console.error('Vibe check error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRewrite = async () => {
    if (!feedback.trim()) return

    setRewriting(true)
    try {
      const result = await callAIAgent(
        `Rewrite this message based on feedback:\n\nOriginal: ${draft}\n\nFeedback: ${feedback}`,
        AGENT_IDS.MESSAGE_WRITER_AGENT
      )

      if (result.response.result) {
        const writerResult = result.response.result as MessageWriterResult
        const newDraft = writerResult.message_draft || draft
        setDraft(newDraft)
        setDraftVersion(prev => prev + 1)
        setFeedback('')

        const vibeCheck = await callAIAgent(newDraft, AGENT_IDS.CLAWDBOT_VIBE_CHECKER)
        if (vibeCheck.response.result) {
          setVibeCheckResult(vibeCheck.response.result as VibeCheckerResult)
        }
      }
    } catch (error) {
      console.error('Rewrite error:', error)
    } finally {
      setRewriting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100">Vibe Check & Rewrite</h2>
        <p className="text-sm text-gray-400">AI-powered message quality control</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#27272A]">Message Draft</CardTitle>
              <Badge variant="outline" className="border-[#71514F] text-[#71514F]">
                Version {draftVersion}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="min-h-[150px] bg-white text-[#27272A]"
            />

            <div className="flex justify-between text-xs text-[#4A2F2D]">
              <span>Word count: {draft.split(' ').length}</span>
              <span className={draft.split(' ').length > 50 ? 'text-red-500' : 'text-green-600'}>
                {draft.split(' ').length > 50 ? 'Exceeds 50-word limit' : 'Within limit'}
              </span>
            </div>

            <Button
              className="w-full bg-[#71514F] hover:bg-[#4A2F2D] text-white"
              onClick={handleVibeCheck}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Running Vibe Check...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Run Vibe Check
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#27272A]">Vibe Check Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vibeCheckResult ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4A2F2D]">Verdict:</span>
                  <Badge className={vibeCheckResult.verdict === 'pass' ? 'bg-green-500' : 'bg-red-500'}>
                    {vibeCheckResult.verdict.toUpperCase()}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4A2F2D]">Style DNA Match:</span>
                  <span className="font-semibold text-[#27272A]">{vibeCheckResult.style_dna_match_score}%</span>
                </div>

                {vibeCheckResult.violations.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-[#27272A]">Violations:</Label>
                    {vibeCheckResult.violations.map((violation, idx) => (
                      <div key={idx} className="p-2 bg-red-500/10 border border-red-500/20 rounded text-xs">
                        <div className="font-semibold text-red-700">{violation.type}</div>
                        <div className="text-[#27272A]">{violation.detail}</div>
                      </div>
                    ))}
                  </div>
                )}

                {vibeCheckResult.recommendations.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-[#27272A]">Recommendations:</Label>
                    <ul className="space-y-1">
                      {vibeCheckResult.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-xs text-[#4A2F2D] flex items-start gap-2">
                          <span className="text-[#71514F]">-</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Separator className="bg-gray-300" />

                <div className="space-y-2">
                  <Label className="text-[#27272A]">Request Rewrite</Label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter feedback for rewrite (e.g., 'Make it more casual' or 'Focus on ROI')"
                    className="min-h-[80px] bg-white"
                  />
                  <Button
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={handleRewrite}
                    disabled={rewriting || !feedback.trim()}
                  >
                    {rewriting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Rewriting...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Request Rewrite
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Brain className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-[#4A2F2D]">Run Vibe Check to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DigitalTwinDashboard() {
  const [isPaused, setIsPaused] = useState(false)
  const [dailyLimit, setDailyLimit] = useState([30])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Digital Twin Dashboard</h2>
          <p className="text-sm text-gray-400">Monitor AI clone LinkedIn activity</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="text-gray-300">Digital Twin</Label>
            <Switch checked={!isPaused} onCheckedChange={(checked) => setIsPaused(!checked)} />
            <Badge className={isPaused ? 'bg-gray-500' : 'bg-green-500'}>
              {isPaused ? 'Paused' : 'Active'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#71514F]">27</div>
              <div className="text-sm text-[#4A2F2D] mt-1">Connections Today</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">68%</div>
              <div className="text-sm text-[#4A2F2D] mt-1">Acceptance Rate</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">142</div>
              <div className="text-sm text-[#4A2F2D] mt-1">Pending Requests</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">18</div>
              <div className="text-sm text-[#4A2F2D] mt-1">Conversations Started</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-[#F3EFEA] border-gray-700">
            <CardHeader>
              <CardTitle className="text-[#27272A]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {[
                    { action: 'Connection sent', name: 'Sarah Chen', company: 'TechCorp', time: '5 min ago', status: 'success' },
                    { action: 'Post engaged', name: 'Marcus Thompson', company: 'Global Solutions', time: '12 min ago', status: 'success' },
                    { action: 'Comment posted', name: 'Emily Rodriguez', company: 'Innovation Partners', time: '23 min ago', status: 'success' },
                    { action: 'Connection sent', name: 'David Park', company: 'Enterprise Systems', time: '34 min ago', status: 'pending' },
                    { action: 'Connection accepted', name: 'Lisa Wang', company: 'DataFlow Inc', time: '1 hour ago', status: 'success' }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-300">
                      <div className={cn(
                        'h-2 w-2 rounded-full mt-2',
                        activity.status === 'success' && 'bg-green-500',
                        activity.status === 'pending' && 'bg-yellow-500'
                      )} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-sm text-[#27272A]">{activity.action}</div>
                          <span className="text-xs text-[#4A2F2D]">{activity.time}</span>
                        </div>
                        <div className="text-xs text-[#4A2F2D] mt-1">
                          {activity.name} - {activity.company}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-[#F3EFEA] border-gray-700">
            <CardHeader>
              <CardTitle className="text-sm text-[#27272A]">Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[#27272A]">Daily Connection Limit</Label>
                <Slider
                  value={dailyLimit}
                  onValueChange={setDailyLimit}
                  max={50}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-[#4A2F2D]">
                  <span>0</span>
                  <span className="font-semibold">{dailyLimit[0]} connections/day</span>
                  <span>50</span>
                </div>
              </div>

              <Separator className="bg-gray-300" />

              <div className="space-y-2">
                <Label className="text-[#27272A]">Target ICP</Label>
                <Button variant="outline" size="sm" className="w-full border-[#71514F] text-[#71514F]">
                  <Target className="h-4 w-4 mr-2" />
                  Configure ICP
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-[#27272A]">Style DNA</Label>
                <div className="flex items-center justify-between p-2 bg-white rounded border border-gray-300">
                  <span className="text-xs text-[#27272A]">Match Score</span>
                  <Badge className="bg-green-500">94%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#F3EFEA] border-gray-700">
            <CardHeader>
              <CardTitle className="text-sm text-[#27272A]">Engagement Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-[#4A2F2D]">Posts Engaged</span>
                <span className="font-semibold text-[#27272A]">47</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#4A2F2D]">Comments Posted</span>
                <span className="font-semibold text-[#27272A]">23</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#4A2F2D]">ICP Responses</span>
                <span className="font-semibold text-green-600">12</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#4A2F2D]">Meetings Booked</span>
                <span className="font-semibold text-[#71514F]">5</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function LinkedInMonitorFeed() {
  const [signals, setSignals] = useState(MOCK_LINKEDIN_SIGNALS)
  const [filterType, setFilterType] = useState<string>('all')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">LinkedIn Monitor Feed</h2>
          <p className="text-sm text-gray-400">Real-time ICP signals from LinkedIn</p>
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Signals</SelectItem>
              <SelectItem value="job_change">Job Changes</SelectItem>
              <SelectItem value="pain_point_post">Pain Point Posts</SelectItem>
              <SelectItem value="content_engagement">Content Engagement</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-[#71514F] text-[#71514F]">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {signals.map((signal) => (
          <Card key={signal.id} className="bg-[#F3EFEA] border-gray-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-blue-500" />
                  <div>
                    <CardTitle className="text-sm text-[#27272A]">
                      {signal.type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Detected
                    </CardTitle>
                    <CardDescription className="text-xs text-[#4A2F2D]">
                      {signal.icpName} - {signal.icpCompany}
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  className={cn(
                    'text-xs',
                    signal.opportunityScore >= 80 && 'bg-red-500',
                    signal.opportunityScore >= 60 && signal.opportunityScore < 80 && 'bg-orange-500',
                    signal.opportunityScore < 60 && 'bg-blue-500'
                  )}
                >
                  {signal.opportunityScore}/100
                </Badge>
              </div>
              <span className="text-xs text-[#4A2F2D]">{signal.timestamp}</span>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-[#4A2F2D]">Opportunity Score</Label>
                <Progress value={signal.opportunityScore} className="h-2 mt-1" />
              </div>

              <div>
                <Label className="text-xs text-[#4A2F2D]">Rationale</Label>
                <p className="text-sm text-[#27272A] mt-1">{signal.rationale}</p>
              </div>

              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Label className="text-xs text-[#4A2F2D]">Suggested Response</Label>
                <p className="text-sm text-[#27272A] mt-1 italic">{signal.suggestedResponse}</p>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve & Send
              </Button>
              <Button variant="outline" className="flex-1 border-[#71514F] text-[#71514F]">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" className="border-red-500 text-red-600">
                <XCircle className="h-4 w-4 mr-2" />
                Dismiss
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AutomationWorkflows() {
  const [workflows, setWorkflows] = useState(MOCK_WORKFLOWS)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Automation Workflows</h2>
          <p className="text-sm text-gray-400">MoltBot automation & orchestration</p>
        </div>
        <Button className="bg-[#71514F] hover:bg-[#4A2F2D] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="bg-[#F3EFEA] border-gray-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-[#27272A]">{workflow.name}</CardTitle>
                  <CardDescription className="text-[#4A2F2D]">{workflow.description}</CardDescription>
                </div>
                <Badge
                  className={cn(
                    'text-xs',
                    workflow.status === 'active' && 'bg-green-500',
                    workflow.status === 'paused' && 'bg-yellow-500',
                    workflow.status === 'draft' && 'bg-gray-500'
                  )}
                >
                  {workflow.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-[#4A2F2D]">Trigger</Label>
                  <p className="text-sm text-[#27272A] mt-1">{workflow.trigger}</p>
                </div>
                <div>
                  <Label className="text-xs text-[#4A2F2D]">Schedule</Label>
                  <p className="text-sm text-[#27272A] mt-1">{workflow.schedule}</p>
                </div>
              </div>

              <div>
                <Label className="text-xs text-[#4A2F2D]">Actions</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {workflow.actions.map((action, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs border-[#71514F] text-[#71514F]">
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#4A2F2D]">Last Run: </span>
                  <span className="font-semibold text-[#27272A]">{workflow.lastRun || 'Never'}</span>
                </div>
                <div>
                  <span className="text-[#4A2F2D]">Next Run: </span>
                  <span className="font-semibold text-[#27272A]">{workflow.nextRun || 'Not scheduled'}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" size="sm" className="border-[#71514F] text-[#71514F]">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="border-[#71514F] text-[#71514F]">
                {workflow.status === 'active' ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" className="border-red-500 text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// Settings Panel Component
// =============================================================================

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    // Profile Settings
    fullName: 'John Smith',
    email: 'john@acmecorp.com',
    jobTitle: 'Sales Director',
    company: 'Acme Corp',

    // Integration Settings
    gmailConnected: true,
    linkedinConnected: true,
    calendlyConnected: true,
    hubspotConnected: false,

    // Campaign Settings
    dailyLinkedinLimit: 50,
    emailSignature: 'Best regards,\nJohn Smith\nSales Director, Acme Corp',
    defaultCampaignLens: 'growth',
    autoFailover: true,

    // Notification Settings
    emailNotifications: true,
    slackNotifications: false,
    weeklyReports: true,

    // Agent Settings
    digitalTwinEnabled: true,
    linkedinMonitorEnabled: true,
    autoResponseEnabled: false,

    // API Keys
    apolloApiKey: '••••••••••••••••',
    clayApiKey: '••••••••••••••••',
    instantlyApiKey: '••••••••••••••••'
  })

  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const handleSaveSettings = async () => {
    setSaving(true)
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
  }

  const handleConnectIntegration = async (integration: string) => {
    console.log(`Connecting ${integration} - OAuth handled by agent`)
    // Agent handles OAuth
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Settings</h2>
          <p className="text-sm text-gray-400 mt-1">Manage your account, integrations, and preferences</p>
        </div>
        <Button onClick={handleSaveSettings} disabled={saving} className="bg-[#71514F] hover:bg-[#5a403e]">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="profile" className="data-[state=active]:bg-[#71514F]">Profile</TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-[#71514F]">Integrations</TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-[#71514F]">Campaigns</TabsTrigger>
          <TabsTrigger value="agents" className="data-[state=active]:bg-[#71514F]">Agents</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#71514F]">Notifications</TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-[#71514F]">API Keys</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4 mt-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Profile Information</CardTitle>
              <CardDescription className="text-gray-400">Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Full Name</Label>
                  <Input
                    value={settings.fullName}
                    onChange={(e) => setSettings({ ...settings, fullName: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Email</Label>
                  <Input
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-gray-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Job Title</Label>
                  <Input
                    value={settings.jobTitle}
                    onChange={(e) => setSettings({ ...settings, jobTitle: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Company</Label>
                  <Input
                    value={settings.company}
                    onChange={(e) => setSettings({ ...settings, company: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-gray-100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-4 mt-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Connected Integrations</CardTitle>
              <CardDescription className="text-gray-400">Manage your third-party connections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'gmail', name: 'Gmail', icon: Mail, connected: settings.gmailConnected, color: 'red' },
                { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, connected: settings.linkedinConnected, color: 'blue' },
                { id: 'calendly', name: 'Calendly', icon: Calendar, connected: settings.calendlyConnected, color: 'blue' },
                { id: 'hubspot', name: 'HubSpot', icon: Database, connected: settings.hubspotConnected, color: 'orange' }
              ].map((integration) => {
                const Icon = integration.icon
                return (
                  <div key={integration.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-900 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'h-10 w-10 rounded-lg flex items-center justify-center',
                        integration.color === 'red' && 'bg-red-500/10',
                        integration.color === 'blue' && 'bg-blue-500/10',
                        integration.color === 'orange' && 'bg-orange-500/10'
                      )}>
                        <Icon className={cn(
                          'h-5 w-5',
                          integration.color === 'red' && 'text-red-400',
                          integration.color === 'blue' && 'text-blue-400',
                          integration.color === 'orange' && 'text-orange-400'
                        )} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-100">{integration.name}</div>
                        <div className="text-xs text-gray-400">
                          {integration.connected ? 'Connected' : 'Not connected'}
                        </div>
                      </div>
                    </div>
                    {integration.connected ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleConnectIntegration(integration.name)}
                        className="border-[#71514F] text-[#71514F] hover:bg-[#71514F] hover:text-white"
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaign Settings */}
        <TabsContent value="campaigns" className="space-y-4 mt-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Campaign Defaults</CardTitle>
              <CardDescription className="text-gray-400">Configure default campaign behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Daily LinkedIn Message Limit</Label>
                  <span className="text-sm text-gray-400">{settings.dailyLinkedinLimit} messages/day</span>
                </div>
                <Slider
                  value={[settings.dailyLinkedinLimit]}
                  onValueChange={(value) => setSettings({ ...settings, dailyLinkedinLimit: value[0] })}
                  min={10}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Default Campaign Lens</Label>
                <Select value={settings.defaultCampaignLens} onValueChange={(value) => setSettings({ ...settings, defaultCampaignLens: value })}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="efficiency">Efficiency</SelectItem>
                    <SelectItem value="growth">Growth</SelectItem>
                    <SelectItem value="disruptor">Disruptor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Email Signature</Label>
                <Textarea
                  value={settings.emailSignature}
                  onChange={(e) => setSettings({ ...settings, emailSignature: e.target.value })}
                  className="bg-gray-900 border-gray-700 text-gray-100"
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900 border border-gray-700">
                <div>
                  <div className="font-medium text-gray-100">Auto-Failover to Email</div>
                  <div className="text-xs text-gray-400 mt-1">Automatically send emails when LinkedIn limits reached</div>
                </div>
                <Switch
                  checked={settings.autoFailover}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoFailover: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agent Settings */}
        <TabsContent value="agents" className="space-y-4 mt-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">AI Agent Configuration</CardTitle>
              <CardDescription className="text-gray-400">Control autonomous agent behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900 border border-gray-700">
                <div className="flex items-center gap-3">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <div>
                    <div className="font-medium text-gray-100">Digital Twin Agent</div>
                    <div className="text-xs text-gray-400 mt-1">Autonomously manages LinkedIn connections</div>
                  </div>
                </div>
                <Switch
                  checked={settings.digitalTwinEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, digitalTwinEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900 border border-gray-700">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="font-medium text-gray-100">LinkedIn Monitor Agent</div>
                    <div className="text-xs text-gray-400 mt-1">Detects ICP signals and opportunities</div>
                  </div>
                </div>
                <Switch
                  checked={settings.linkedinMonitorEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, linkedinMonitorEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900 border border-gray-700">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="font-medium text-gray-100">Auto-Response (Experimental)</div>
                    <div className="text-xs text-gray-400 mt-1">Automatically respond to qualified leads</div>
                  </div>
                </div>
                <Switch
                  checked={settings.autoResponseEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoResponseEnabled: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4 mt-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Notification Preferences</CardTitle>
              <CardDescription className="text-gray-400">Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900 border border-gray-700">
                <div>
                  <div className="font-medium text-gray-100">Email Notifications</div>
                  <div className="text-xs text-gray-400 mt-1">Receive campaign updates via email</div>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900 border border-gray-700">
                <div>
                  <div className="font-medium text-gray-100">Slack Notifications</div>
                  <div className="text-xs text-gray-400 mt-1">Get real-time alerts in Slack</div>
                </div>
                <Switch
                  checked={settings.slackNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, slackNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900 border border-gray-700">
                <div>
                  <div className="font-medium text-gray-100">Weekly Reports</div>
                  <div className="text-xs text-gray-400 mt-1">Receive performance summaries every Monday</div>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => setSettings({ ...settings, weeklyReports: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Settings */}
        <TabsContent value="api" className="space-y-4 mt-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">API Keys</CardTitle>
              <CardDescription className="text-gray-400">Manage your external service API keys</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Apollo API Key', key: 'apolloApiKey', service: 'Apollo.io' },
                { name: 'Clay API Key', key: 'clayApiKey', service: 'Clay' },
                { name: 'Instantly.ai API Key', key: 'instantlyApiKey', service: 'Instantly.ai' }
              ].map((apiKey) => (
                <div key={apiKey.key} className="space-y-2">
                  <Label className="text-gray-300">{apiKey.name}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value={settings[apiKey.key as keyof typeof settings] as string}
                      className="bg-gray-900 border-gray-700 text-gray-100 flex-1"
                      readOnly
                    />
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Used for {apiKey.service} integration</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// =============================================================================
// Main Component
// =============================================================================

export default function Home() {
  const [activeScreen, setActiveScreen] = useState('mission-control')
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    name: 'John Smith',
    email: 'john@acmecorp.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=71514F&color=fff',
    workspace: 'Acme Corp - Sales',
    role: 'Sales Director'
  })
  const [workspaces] = useState([
    { id: 1, name: 'Acme Corp - Sales', role: 'Sales Director', members: 8 },
    { id: 2, name: 'Acme Corp - Marketing', role: 'Viewer', members: 12 },
    { id: 3, name: 'Personal Workspace', role: 'Owner', members: 1 }
  ])

  const handleGoogleLogin = async () => {
    // Agent handles OAuth - just simulate login success
    console.log('Google login initiated - OAuth handled by agent')
  }

  return (
    <div className="min-h-screen bg-[#27272A]">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#27272A]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-[#71514F] rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Lyzr Outreach V2.0</h1>
                <p className="text-xs text-gray-400">Enterprise Multi-Agent Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                24 Agents Active
              </Badge>

              {/* Workspace Selector */}
              <div className="relative">
                <button
                  onClick={() => setWorkspaceOpen(!workspaceOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="h-6 w-6 rounded-full"
                    />
                    <div className="text-left hidden md:block">
                      <div className="text-xs font-medium text-gray-200">{currentUser.name}</div>
                      <div className="text-[10px] text-gray-400">{currentUser.workspace}</div>
                    </div>
                  </div>
                  {workspaceOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </button>

                {/* Workspace Dropdown */}
                {workspaceOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center gap-3">
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-100">{currentUser.name}</div>
                          <div className="text-xs text-gray-400">{currentUser.email}</div>
                          <div className="text-xs text-gray-500 mt-1">{currentUser.role}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Switch Workspace
                      </div>
                      {workspaces.map((ws) => (
                        <button
                          key={ws.id}
                          onClick={() => {
                            setCurrentUser({ ...currentUser, workspace: ws.name, role: ws.role })
                            setWorkspaceOpen(false)
                          }}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors',
                            ws.name === currentUser.workspace
                              ? 'bg-[#71514F] text-white'
                              : 'text-gray-300 hover:bg-gray-700'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-gray-700 flex items-center justify-center">
                              <Users className="h-4 w-4 text-gray-400" />
                            </div>
                            <div className="text-left">
                              <div className="font-medium">{ws.name}</div>
                              <div className="text-xs text-gray-400">{ws.role} • {ws.members} members</div>
                            </div>
                          </div>
                          {ws.name === currentUser.workspace && (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="p-2 border-t border-gray-700">
                      <button
                        onClick={() => {
                          setActiveScreen('workspace')
                          setWorkspaceOpen(false)
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Manage Workspaces
                      </button>
                      <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 transition-colors mt-1"
                      >
                        <UserPlus className="h-4 w-4" />
                        Connect Google Account
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => setActiveScreen('settings')}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar Navigation */}
        <div className="w-64 border-r border-gray-800 bg-[#27272A] min-h-screen">
          <nav className="p-4 space-y-1">
            {[
              { id: 'mission-control', icon: LayoutDashboard, label: 'Mission Control' },
              { id: 'campaign-architect', icon: Target, label: 'Campaign Architect' },
              { id: 'apollo-leads', icon: Database, label: 'Apollo Leads' },
              { id: 'bulk-campaigns', icon: Send, label: 'Bulk Campaigns' },
              { id: 'qa-inbox', icon: MessageSquare, label: 'QA Inbox' },
              { id: 'digital-twin', icon: Users, label: 'Digital Twin' },
              { id: 'linkedin-monitor', icon: Bell, label: 'LinkedIn Monitor' },
              { id: 'automation', icon: Workflow, label: 'Automation' },
              { id: 'workspace', icon: Users, label: 'Workspace' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all',
                    activeScreen === item.id
                      ? 'bg-[#71514F] text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeScreen === 'mission-control' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-6">Mission Control</h2>
              <p className="text-gray-400">Dashboard coming soon - select a feature from the sidebar</p>
            </div>
          )}
          {activeScreen === 'campaign-architect' && <EnhancedICPConfig />}
          {activeScreen === 'apollo-leads' && <ApolloLeadsDashboard />}
          {activeScreen === 'bulk-campaigns' && <BulkCampaignBuilder />}
          {activeScreen === 'qa-inbox' && <VibeCheckRewrite />}
          {activeScreen === 'digital-twin' && <DigitalTwinDashboard />}
          {activeScreen === 'linkedin-monitor' && <LinkedInMonitorFeed />}
          {activeScreen === 'automation' && <AutomationWorkflows />}
          {activeScreen === 'workspace' && <WorkspaceManagement />}
          {activeScreen === 'settings' && <SettingsPanel />}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#27272A] py-4">
        <div className="container mx-auto px-6 text-center text-xs text-gray-500">
          Powered by 24-Agent Orchestration System | Real-time AI Campaign Management
        </div>
      </footer>
    </div>
  )
}
