/**
 * Lyzr Outreach V2.0 - Complete Campaign Orchestration UI
 *
 * Built with ACTUAL test response data from 18-agent system
 * NO emojis, NO toast notifications, NO auth flows
 * Uses aiAgent.ts for ALL agent interactions
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
  Loader2
} from 'lucide-react'
import { callAIAgent } from '@/utils/aiAgent'
import type { NormalizedAgentResponse } from '@/utils/aiAgent'
import { cn } from '@/lib/utils'

// =============================================================================
// AGENT IDs - From workflow.json
// =============================================================================

const AGENT_IDS = {
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
  MEETING_SCHEDULER_AGENT: '697ca8abd36f070193f5bd59'
} as const

// =============================================================================
// TypeScript Interfaces - Built from ACTUAL test responses
// =============================================================================

// Deep Research Agent Response
interface ValueNugget {
  source: string
  insight: string
  relevance_score: number
}

interface FinancialTrends {
  revenue_growth: string
  strategic_initiatives: string[]
}

interface LinkedInActivity {
  engagement_topics: string[]
  posting_frequency: string
}

interface DeepResearchResult {
  value_nuggets: ValueNugget[]
  financial_trends: FinancialTrends
  linkedin_activity: LinkedInActivity
  research_summary: string
}

// Intent Scoring Agent Response
interface SignalBreakdown {
  signal_type: string
  weight: number
  timestamp: string
}

interface DecayAnalysis {
  recent_signals: number
  decayed_signals: number
}

interface IntentScoringResult {
  compound_momentum_score: number
  intent_level: string
  signal_breakdown: SignalBreakdown[]
  decay_analysis: DecayAnalysis
  scoring_summary: string
}

// Memo Synthesis Agent Response
interface SCRMemo {
  situation: string
  complication: string
  resolution: string
}

interface MemoSynthesisResult {
  scr_memo: SCRMemo
  retrieved_assets: any[]
  primary_pain_point: string
  memo_summary: string
}

// Message Writer Agent Response
interface MessageWriterResult {
  message_draft: string
  word_count: number
  style_dna_applied: any[]
  value_nugget_referenced: string
  tone_assessment: string
}

// Clawdbot Vibe Checker Response
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

// Creative Strategist Response
interface AdBrief {
  target_audience: string
  narrative_hook: string
  pain_point: string
  value_proposition: string
  cta: string
  creative_concept: string
}

interface RetrievedPlaybook {
  title: string
  relevance: string
}

interface CreativeStrategistResult {
  ad_brief: AdBrief
  retrieved_playbooks: RetrievedPlaybook[]
  brief_summary: string
}

// System Sentinel Response
interface LinkedInRateLimit {
  remaining: number
  reset_at: string
  status: string
}

interface ModelLatency {
  avg_response_time_ms: number
  threshold_exceeded: boolean
}

interface SystemSentinelResult {
  system_health: string
  linkedin_rate_limit: LinkedInRateLimit
  model_latency: ModelLatency
  failover_triggered: boolean
  failover_reason: string
  health_summary: string
}

// HubSpot Sync Response
interface HubSpotSyncResult {
  sync_action: string
  contact_id: string
  fields_updated: any[]
  sync_status: string
  sync_summary: string
}

// LinkedIn Delivery Response
interface LinkedInDeliveryResult {
  delivery_status: string
  message_id: string
  recipient: string
  sent_at: string
  timing_delay_applied: number
  proxy_used: boolean
  delivery_summary: string
}

// Instantly.ai Failover Response
interface InstantlyFailoverResult {
  failover_status: string
  email_id: string
  recipient_email: string
  sent_at: string
  deliverability_score: number
  failover_reason: string
  failover_summary: string
}

// =============================================================================
// Mock Data - Simulating Signal Feed
// =============================================================================

interface SignalCard {
  id: string
  lead_name: string
  company: string
  signal_type: string
  momentum_score: number
  intent_level: string
  timestamp: string
  agent_source: string
  nugget: string
}

const MOCK_SIGNALS: SignalCard[] = [
  {
    id: 'sig-001',
    lead_name: 'Sarah Chen',
    company: 'TechCorp Industries',
    signal_type: 'web_visit',
    momentum_score: 85,
    intent_level: 'Hot',
    timestamp: '2026-01-30T10:30:00Z',
    agent_source: 'Intent Scoring Agent',
    nugget: 'Visited pricing page 3x in last 24 hours'
  },
  {
    id: 'sig-002',
    lead_name: 'Marcus Thompson',
    company: 'Global Solutions Ltd',
    signal_type: 'content_download',
    momentum_score: 75,
    intent_level: 'Warm',
    timestamp: '2026-01-30T09:15:00Z',
    agent_source: 'Deep Research Agent',
    nugget: 'Downloaded ROI calculator, showing interest in cost optimization'
  },
  {
    id: 'sig-003',
    lead_name: 'Emily Rodriguez',
    company: 'Innovation Partners',
    signal_type: 'email_open',
    momentum_score: 60,
    intent_level: 'Warm',
    timestamp: '2026-01-30T08:45:00Z',
    agent_source: 'Intent Scoring Agent',
    nugget: 'Opened product demo email, clicked on features section'
  },
  {
    id: 'sig-004',
    lead_name: 'David Park',
    company: 'Enterprise Systems Co',
    signal_type: 'linkedin_engagement',
    momentum_score: 92,
    intent_level: 'Hot',
    timestamp: '2026-01-30T07:20:00Z',
    agent_source: 'Deep Research Agent',
    nugget: 'Company posting about digital transformation initiatives'
  }
]

interface QueuedMessage {
  id: string
  lead_name: string
  company: string
  channel: string
  momentum_score: number
  draft: string
  word_count: number
  vibe_check_status: 'pass' | 'fail' | 'pending'
  style_match_score: string
  timestamp: string
}

const MOCK_QUEUE: QueuedMessage[] = [
  {
    id: 'msg-001',
    lead_name: 'Sarah Chen',
    company: 'TechCorp Industries',
    channel: 'LinkedIn',
    momentum_score: 85,
    draft: "Hi Sarah - noticed TechCorp's been exploring pricing options. We've helped similar enterprises cut implementation time by 40%. Worth a quick chat?",
    word_count: 24,
    vibe_check_status: 'pass',
    style_match_score: '95',
    timestamp: '2026-01-30T10:35:00Z'
  },
  {
    id: 'msg-002',
    lead_name: 'Marcus Thompson',
    company: 'Global Solutions Ltd',
    channel: 'Email',
    momentum_score: 75,
    draft: "Marcus - saw you grabbed our ROI calculator. Happy to walk through how we've delivered 3x returns for companies your size. 15 min call?",
    word_count: 26,
    vibe_check_status: 'pending',
    style_match_score: '88',
    timestamp: '2026-01-30T09:20:00Z'
  }
]

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
// Sub-Components - Defined OUTSIDE Home() to prevent re-creation
// =============================================================================

function SignalPulseFeed({ onSelectSignal }: { onSelectSignal: (signal: SignalCard) => void }) {
  const [signals] = useState(MOCK_SIGNALS)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-100">Signal Pulse Feed</h3>
        </div>
        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
          {signals.length} Active
        </Badge>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-3">
          {signals.map((signal) => (
            <Card
              key={signal.id}
              className="bg-[#F3EFEA] border-gray-700 hover:border-[#71514F] transition-all cursor-pointer"
              onClick={() => onSelectSignal(signal)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold text-[#27272A]">
                      {signal.lead_name}
                    </CardTitle>
                    <CardDescription className="text-xs text-[#4A2F2D]">
                      {signal.company}
                    </CardDescription>
                  </div>
                  <Badge
                    className={cn(
                      'text-xs font-medium',
                      signal.intent_level === 'Hot' && 'bg-red-500 text-white',
                      signal.intent_level === 'Warm' && 'bg-orange-500 text-white',
                      signal.intent_level === 'Cold' && 'bg-blue-500 text-white'
                    )}
                  >
                    {signal.intent_level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#4A2F2D] font-medium">{signal.signal_type}</span>
                  <span className="text-[#27272A] font-bold">{signal.momentum_score}</span>
                </div>
                <Progress value={signal.momentum_score} className="h-1.5" />
                <p className="text-xs text-[#27272A] leading-relaxed">{signal.nugget}</p>
                <div className="flex items-center gap-2 pt-1">
                  <Badge variant="outline" className="text-xs border-[#71514F] text-[#71514F]">
                    {signal.agent_source}
                  </Badge>
                  <span className="text-xs text-[#4A2F2D]">
                    {new Date(signal.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

function IntentHeatmap({ signals }: { signals: SignalCard[] }) {
  const sortedSignals = useMemo(() => {
    return [...signals].sort((a, b) => b.momentum_score - a.momentum_score)
  }, [signals])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-100">Intent Heatmap</h3>
        </div>
        <Button variant="outline" size="sm" className="border-[#71514F] text-[#71514F]">
          <Filter className="h-4 w-4 mr-2" />
          Sort by Score
        </Button>
      </div>

      <div className="grid gap-3">
        {sortedSignals.map((signal) => (
          <div
            key={signal.id}
            className="relative overflow-hidden rounded-lg border border-gray-700 bg-[#F3EFEA] p-4"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent"
              style={{ width: `${signal.momentum_score}%` }}
            />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <div className="font-semibold text-sm text-[#27272A]">{signal.lead_name}</div>
                <div className="text-xs text-[#4A2F2D]">{signal.company}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#71514F]">{signal.momentum_score}</div>
                  <div className="text-xs text-[#4A2F2D]">Momentum</div>
                </div>
                <Badge
                  className={cn(
                    'text-xs',
                    signal.intent_level === 'Hot' && 'bg-red-500',
                    signal.intent_level === 'Warm' && 'bg-orange-500',
                    signal.intent_level === 'Cold' && 'bg-blue-500'
                  )}
                >
                  {signal.intent_level}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickActions({ onLaunchMission }: { onLaunchMission: () => void }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-100">Quick Actions</h3>

      <div className="space-y-3">
        <Button
          className="w-full bg-[#71514F] hover:bg-[#4A2F2D] text-white"
          size="lg"
          onClick={onLaunchMission}
        >
          <Play className="h-5 w-5 mr-2" />
          Launch Mission
        </Button>

        <Button variant="outline" className="w-full border-[#4A2F2D] text-[#4A2F2D]" size="lg">
          <Eye className="h-5 w-5 mr-2" />
          View All Signals
        </Button>

        <Button variant="outline" className="w-full border-gray-600 text-gray-300" size="lg">
          <Upload className="h-5 w-5 mr-2" />
          Upload Context
        </Button>
      </div>

      <Separator className="bg-gray-700" />

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-200">Campaign Status</h4>

        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-[#27272A]">Active Campaigns</CardTitle>
              <Badge className="bg-green-500 text-white">3 Running</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#4A2F2D]">Messages Sent</span>
              <span className="font-semibold text-[#27272A]">247</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#4A2F2D]">Response Rate</span>
              <span className="font-semibold text-green-600">24%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#4A2F2D]">Meetings Booked</span>
              <span className="font-semibold text-[#71514F]">18</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CampaignArchitect() {
  const [strategicLens, setStrategicLens] = useState<'efficiency' | 'growth' | 'disruptor'>('efficiency')
  const [loading, setLoading] = useState(false)
  const [icpResult, setIcpResult] = useState<NormalizedAgentResponse | null>(null)

  const handleGenerateICP = async () => {
    setLoading(true)
    try {
      const result = await callAIAgent(
        `Generate ICP for ${strategicLens} strategy with firmographic filters`,
        AGENT_IDS.ICP_GENERATION_AGENT
      )
      setIcpResult(result.response)
    } catch (error) {
      console.error('ICP generation error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Configuration */}
      <div className="space-y-6">
        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#27272A]">Strategic Lens Selector</CardTitle>
            <CardDescription className="text-[#4A2F2D]">
              Choose your campaign strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <Card
                className={cn(
                  'cursor-pointer transition-all border-2',
                  strategicLens === 'efficiency'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 hover:border-blue-400'
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
                  strategicLens === 'growth'
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-gray-600 hover:border-green-400'
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
                  strategicLens === 'disruptor'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-gray-600 hover:border-purple-400'
                )}
                onClick={() => setStrategicLens('disruptor')}
              >
                <CardContent className="p-4 text-center">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="font-semibold text-sm text-[#27272A]">Disruptor</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#27272A]">ICP Configuration</CardTitle>
            <CardDescription className="text-[#4A2F2D]">
              Define your ideal customer profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-[#27272A]">Industry</Label>
              <Select>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="fintech">FinTech</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-size" className="text-[#27272A]">Company Size</Label>
              <Select>
                <SelectTrigger id="company-size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">Startup (1-50)</SelectItem>
                  <SelectItem value="smb">SMB (51-500)</SelectItem>
                  <SelectItem value="mid">Mid-Market (501-5000)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (5000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="revenue" className="text-[#27272A]">Revenue Range</Label>
              <Input id="revenue" placeholder="e.g., $10M - $50M" />
            </div>

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

            {icpResult && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-xs text-[#27272A]">
                  {icpResult.message || 'ICP generated successfully'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Button className="w-full bg-[#71514F] hover:bg-[#4A2F2D] text-white" size="lg">
          <Play className="h-5 w-5 mr-2" />
          Launch Mission
        </Button>
      </div>

      {/* Right Panel - Context Board */}
      <div className="space-y-6">
        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#27272A]">Context Board</CardTitle>
            <CardDescription className="text-[#4A2F2D]">
              Drag and drop resources for campaign context
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-500 mb-4" />
              <p className="text-sm text-[#4A2F2D] mb-2">
                Drop playbooks, case studies, or diagrams here
              </p>
              <Button variant="outline" size="sm" className="border-[#71514F] text-[#71514F]">
                <Plus className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-300">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-sm font-medium text-[#27272A]">SaaS Playbook v2.pdf</div>
                    <div className="text-xs text-[#4A2F2D]">2.4 MB</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-300">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-sm font-medium text-[#27272A]">Case Study - TechCorp.docx</div>
                    <div className="text-xs text-[#4A2F2D]">1.1 MB</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader>
            <CardTitle className="text-[#27272A]">Multi-Channel Waterfall</CardTitle>
            <CardDescription className="text-[#4A2F2D]">
              Define your outreach sequence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-300">
              <div className="flex items-center justify-center h-8 w-8 bg-blue-500 text-white rounded-full text-sm font-bold">
                1
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-[#27272A]">LinkedIn DM</div>
                <div className="text-xs text-[#4A2F2D]">Initial outreach</div>
              </div>
              <Badge className="bg-blue-500">Primary</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-orange-300">
              <div className="flex items-center justify-center h-8 w-8 bg-orange-500 text-white rounded-full text-sm font-bold">
                2
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-[#27272A]">Email Follow-up</div>
                <div className="text-xs text-[#4A2F2D]">+3 days if no response</div>
              </div>
              <Badge className="bg-orange-500">Failover</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-300">
              <div className="flex items-center justify-center h-8 w-8 bg-green-500 text-white rounded-full text-sm font-bold">
                3
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-[#27272A]">LinkedIn Ad Retarget</div>
                <div className="text-xs text-[#4A2F2D]">+7 days if warm signal</div>
              </div>
              <Badge className="bg-green-500">Nurture</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function QAInbox() {
  const [selectedMessage, setSelectedMessage] = useState<QueuedMessage | null>(MOCK_QUEUE[0])
  const [editedDraft, setEditedDraft] = useState(MOCK_QUEUE[0]?.draft || '')
  const [loading, setLoading] = useState(false)
  const [vibeCheckResult, setVibeCheckResult] = useState<VibeCheckerResult | null>(null)

  const handleVibeCheck = async () => {
    if (!editedDraft) return

    setLoading(true)
    try {
      const result = await callAIAgent(
        editedDraft,
        AGENT_IDS.CLAWDBOT_VIBE_CHECKER
      )
      if (result.response.result) {
        setVibeCheckResult(result.response.result as VibeCheckerResult)
      }
    } catch (error) {
      console.error('Vibe check error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    if (!selectedMessage) return

    setLoading(true)
    try {
      const result = await callAIAgent(
        `Send approved message to ${selectedMessage.lead_name} via ${selectedMessage.channel}: ${editedDraft}`,
        selectedMessage.channel === 'LinkedIn'
          ? AGENT_IDS.LINKEDIN_DELIVERY_AGENT
          : AGENT_IDS.INSTANTLY_AI_FAILOVER
      )
      console.log('Message sent:', result)
    } catch (error) {
      console.error('Send error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Message Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-100">Message Queue</h3>
          </div>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
            {MOCK_QUEUE.length} Pending
          </Badge>
        </div>

        <ScrollArea className="h-[700px]">
          <div className="space-y-3 pr-4">
            {MOCK_QUEUE.map((msg) => (
              <Card
                key={msg.id}
                className={cn(
                  'cursor-pointer transition-all border-2',
                  selectedMessage?.id === msg.id
                    ? 'border-[#71514F] bg-[#F3EFEA]'
                    : 'border-gray-700 bg-[#F3EFEA] hover:border-gray-600'
                )}
                onClick={() => {
                  setSelectedMessage(msg)
                  setEditedDraft(msg.draft)
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-sm font-semibold text-[#27272A]">
                        {msg.lead_name}
                      </CardTitle>
                      <CardDescription className="text-xs text-[#4A2F2D]">
                        {msg.company}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs',
                          msg.channel === 'LinkedIn' && 'border-blue-500 text-blue-600',
                          msg.channel === 'Email' && 'border-orange-500 text-orange-600'
                        )}
                      >
                        {msg.channel}
                      </Badge>
                      <div className="text-xs font-bold text-[#71514F]">
                        {msg.momentum_score}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-[#27272A] line-clamp-2">{msg.draft}</p>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      {msg.vibe_check_status === 'pass' && (
                        <Badge className="text-xs bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Pass
                        </Badge>
                      )}
                      {msg.vibe_check_status === 'fail' && (
                        <Badge className="text-xs bg-red-500">
                          <XCircle className="h-3 w-3 mr-1" />
                          Fail
                        </Badge>
                      )}
                      {msg.vibe_check_status === 'pending' && (
                        <Badge className="text-xs bg-yellow-500">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      <span className="text-xs text-[#4A2F2D]">
                        DNA: {msg.style_match_score}%
                      </span>
                    </div>
                    <span className="text-xs text-[#4A2F2D]">
                      {msg.word_count} words
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Draft Editor */}
      <div className="space-y-4">
        {selectedMessage ? (
          <>
            <Card className="bg-[#F3EFEA] border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#27272A]">{selectedMessage.lead_name}</CardTitle>
                    <CardDescription className="text-[#4A2F2D]">
                      {selectedMessage.company} - {selectedMessage.channel}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className="bg-[#71514F]">
                      Momentum: {selectedMessage.momentum_score}
                    </Badge>
                    <Badge variant="outline" className="border-[#71514F] text-[#71514F]">
                      DNA Match: {selectedMessage.style_match_score}%
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#27272A]">Message Draft</Label>
                  <Textarea
                    value={editedDraft}
                    onChange={(e) => setEditedDraft(e.target.value)}
                    className="min-h-[120px] bg-white text-[#27272A]"
                    placeholder="Edit your message here..."
                  />
                  <div className="flex justify-between text-xs text-[#4A2F2D]">
                    <span>Word count: {editedDraft.split(' ').length}</span>
                    <span className={editedDraft.split(' ').length > 50 ? 'text-red-500' : 'text-green-600'}>
                      {editedDraft.split(' ').length > 50 ? 'Exceeds 50-word limit' : 'Within limit'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#71514F] text-[#71514F]"
                    onClick={handleVibeCheck}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Run Vibe Check
                  </Button>
                  <Button
                    className="flex-1 bg-[#71514F] hover:bg-[#4A2F2D] text-white"
                    onClick={handleApprove}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Approve & Send
                  </Button>
                </div>
              </CardContent>
            </Card>

            {vibeCheckResult && (
              <Card className="bg-[#F3EFEA] border-gray-700">
                <CardHeader>
                  <CardTitle className="text-sm text-[#27272A]">Vibe Check Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
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

                  <p className="text-xs text-[#27272A] italic">{vibeCheckResult.audit_summary}</p>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 border-orange-500 text-orange-600">
                <RefreshCw className="h-4 w-4 mr-2" />
                Request Rewrite
              </Button>
              <Button variant="outline" className="flex-1 border-red-500 text-red-600">
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
          </>
        ) : (
          <Card className="bg-[#F3EFEA] border-gray-700">
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-[#4A2F2D]">Select a message to review</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function StrategicMemoWorkbench() {
  const [loading, setLoading] = useState(false)
  const [memoResult, setMemoResult] = useState<MemoSynthesisResult | null>(null)
  const [researchResult, setResearchResult] = useState<DeepResearchResult | null>(null)

  const handleGenerateMemo = async () => {
    setLoading(true)
    try {
      const result = await callAIAgent(
        'Generate strategic memo for TechCorp Industries based on recent signals',
        AGENT_IDS.MEMO_SYNTHESIS_AGENT
      )
      if (result.response.result) {
        setMemoResult(result.response.result as MemoSynthesisResult)
      }
    } catch (error) {
      console.error('Memo generation error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeepResearch = async () => {
    setLoading(true)
    try {
      const result = await callAIAgent(
        'Conduct deep research on TechCorp Industries',
        AGENT_IDS.DEEP_RESEARCH_AGENT
      )
      if (result.response.result) {
        setResearchResult(result.response.result as DeepResearchResult)
      }
    } catch (error) {
      console.error('Research error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Memo Display */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#27272A]">Strategic Memo - TechCorp Industries</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeepResearch}
                  disabled={loading}
                  className="border-[#71514F] text-[#71514F]"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Database className="h-4 w-4 mr-2" />
                  )}
                  Deep Research
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateMemo}
                  disabled={loading}
                  className="border-[#71514F] text-[#71514F]"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Brain className="h-4 w-4 mr-2" />
                  )}
                  Generate Memo
                </Button>
              </div>
            </div>
            <CardDescription className="text-[#4A2F2D]">
              SCR-Framework consulting diagnosis with pain point identification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {memoResult ? (
              <>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-6 w-1 bg-blue-500 rounded" />
                      <h4 className="font-semibold text-[#27272A]">Situation</h4>
                    </div>
                    <p className="text-sm text-[#27272A] leading-relaxed pl-3">
                      {memoResult.scr_memo.situation}
                    </p>
                  </div>

                  <Separator className="bg-gray-300" />

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-6 w-1 bg-orange-500 rounded" />
                      <h4 className="font-semibold text-[#27272A]">Complication</h4>
                    </div>
                    <p className="text-sm text-[#27272A] leading-relaxed pl-3">
                      {memoResult.scr_memo.complication}
                    </p>
                  </div>

                  <Separator className="bg-gray-300" />

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-6 w-1 bg-green-500 rounded" />
                      <h4 className="font-semibold text-[#27272A]">Resolution</h4>
                    </div>
                    <p className="text-sm text-[#27272A] leading-relaxed pl-3">
                      {memoResult.scr_memo.resolution}
                    </p>
                  </div>
                </div>

                <Separator className="bg-gray-300" />

                <div className="space-y-2">
                  <Label className="text-[#27272A]">Primary Pain Point</Label>
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-[#27272A] font-medium">
                      {memoResult.primary_pain_point}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#27272A]">Memo Summary</Label>
                  <p className="text-sm text-[#4A2F2D] italic">
                    {memoResult.memo_summary}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-[#4A2F2D] mb-4">No memo generated yet</p>
                <Button
                  onClick={handleGenerateMemo}
                  disabled={loading}
                  className="bg-[#71514F] hover:bg-[#4A2F2D] text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Generate Strategic Memo
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Research Results */}
        {researchResult && (
          <Card className="bg-[#F3EFEA] border-gray-700">
            <CardHeader>
              <CardTitle className="text-sm text-[#27272A]">Deep Research Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[#27272A]">Value Nuggets</Label>
                <div className="space-y-2">
                  {researchResult.value_nuggets.map((nugget, idx) => (
                    <div key={idx} className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-start justify-between mb-1">
                        <Badge variant="outline" className="text-xs border-blue-500 text-blue-600">
                          {nugget.source}
                        </Badge>
                        <Badge className="text-xs bg-blue-500">
                          <Star className="h-3 w-3 mr-1" />
                          {nugget.relevance_score}/10
                        </Badge>
                      </div>
                      <p className="text-xs text-[#27272A]">{nugget.insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#27272A]">Financial Trends</Label>
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-xs text-[#27272A] mb-2">{researchResult.financial_trends.revenue_growth}</p>
                    <div className="space-y-1">
                      {researchResult.financial_trends.strategic_initiatives.map((init, idx) => (
                        <div key={idx} className="text-xs text-[#4A2F2D] flex items-start gap-1">
                          <span className="text-green-600">•</span>
                          <span>{init}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#27272A]">LinkedIn Activity</Label>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-xs text-[#27272A] mb-2">
                      Posting: {researchResult.linkedin_activity.posting_frequency}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {researchResult.linkedin_activity.engagement_topics.map((topic, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-purple-500 text-purple-600">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#71514F]/10 border border-[#71514F]/20 rounded-lg">
                <p className="text-xs text-[#27272A] italic">
                  {researchResult.research_summary}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sidebar - Retrieved Assets & Metadata */}
      <div className="space-y-4">
        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader>
            <CardTitle className="text-sm text-[#27272A]">Retrieved Assets</CardTitle>
            <CardDescription className="text-xs text-[#4A2F2D]">
              RAG-retrieved diagrams and case studies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="p-3 bg-white rounded-lg border border-gray-300">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-medium text-[#27272A]">Architecture Diagram v3</span>
              </div>
              <p className="text-xs text-[#4A2F2D]">System architecture for similar use case</p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-gray-300">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-green-500" />
                <span className="text-xs font-medium text-[#27272A]">Case Study - Enterprise</span>
              </div>
              <p className="text-xs text-[#4A2F2D]">Similar vertical success story</p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-gray-300">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-purple-500" />
                <span className="text-xs font-medium text-[#27272A]">Competitive Battlecard</span>
              </div>
              <p className="text-xs text-[#4A2F2D]">Positioning vs competitors</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader>
            <CardTitle className="text-sm text-[#27272A]">Metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#4A2F2D]">Momentum Score</span>
              <Badge className="bg-[#71514F]">85</Badge>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-[#4A2F2D]">Research Nuggets</Label>
              <div className="flex gap-1 flex-wrap">
                <Badge variant="outline" className="text-xs border-blue-500 text-blue-600">
                  Financial Growth
                </Badge>
                <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                  Digital Transform
                </Badge>
                <Badge variant="outline" className="text-xs border-purple-500 text-purple-600">
                  Tech Investment
                </Badge>
              </div>
            </div>

            <Separator className="bg-gray-300" />

            <div className="space-y-1">
              <Label className="text-xs text-[#4A2F2D]">Pain Points Identified</Label>
              <div className="space-y-1">
                <div className="text-xs text-[#27272A] flex items-start gap-1">
                  <span className="text-red-500">•</span>
                  <span>Legacy system constraints</span>
                </div>
                <div className="text-xs text-[#27272A] flex items-start gap-1">
                  <span className="text-red-500">•</span>
                  <span>Manual process bottlenecks</span>
                </div>
                <div className="text-xs text-[#27272A] flex items-start gap-1">
                  <span className="text-red-500">•</span>
                  <span>Data integration challenges</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#F3EFEA] border-gray-700">
          <CardHeader>
            <CardTitle className="text-sm text-[#27272A]">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full border-[#71514F] text-[#71514F]">
              <Download className="h-4 w-4 mr-2" />
              Export Memo (PDF)
            </Button>
            <Button variant="outline" size="sm" className="w-full border-[#71514F] text-[#71514F]">
              <Mail className="h-4 w-4 mr-2" />
              Share with Team
            </Button>
            <Button variant="outline" size="sm" className="w-full border-[#71514F] text-[#71514F]">
              <Database className="h-4 w-4 mr-2" />
              Sync to HubSpot
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// =============================================================================
// Main Component
// =============================================================================

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedSignal, setSelectedSignal] = useState<SignalCard | null>(null)

  const handleSelectSignal = (signal: SignalCard) => {
    setSelectedSignal(signal)
    console.log('Selected signal:', signal)
  }

  const handleLaunchMission = () => {
    setActiveTab('architect')
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
                <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Lyzr Outreach V2.0
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Campaign Orchestration</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                18 Agents Active
              </Badge>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800 bg-[#27272A]">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent border-0 h-auto p-0 w-full justify-start gap-1">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-[#71514F] data-[state=active]:text-white rounded-t-lg border-0 px-6 py-3"
              >
                <Activity className="h-4 w-4 mr-2" />
                Mission Control
              </TabsTrigger>
              <TabsTrigger
                value="architect"
                className="data-[state=active]:bg-[#71514F] data-[state=active]:text-white rounded-t-lg border-0 px-6 py-3"
              >
                <Target className="h-4 w-4 mr-2" />
                Campaign Architect
              </TabsTrigger>
              <TabsTrigger
                value="qa"
                className="data-[state=active]:bg-[#71514F] data-[state=active]:text-white rounded-t-lg border-0 px-6 py-3"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                QA Inbox
              </TabsTrigger>
              <TabsTrigger
                value="memo"
                className="data-[state=active]:bg-[#71514F] data-[state=active]:text-white rounded-t-lg border-0 px-6 py-3"
              >
                <FileText className="h-4 w-4 mr-2" />
                Strategic Memo
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} className="w-full">
          {/* Mission Control Dashboard */}
          <TabsContent value="dashboard" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Signal Pulse Feed */}
              <div className="lg:col-span-3">
                <SignalPulseFeed onSelectSignal={handleSelectSignal} />
              </div>

              {/* Center: Intent Heatmap */}
              <div className="lg:col-span-6">
                <IntentHeatmap signals={MOCK_SIGNALS} />
              </div>

              {/* Right: Quick Actions */}
              <div className="lg:col-span-3">
                <QuickActions onLaunchMission={handleLaunchMission} />
              </div>
            </div>
          </TabsContent>

          {/* Campaign Architect */}
          <TabsContent value="architect" className="mt-0">
            <CampaignArchitect />
          </TabsContent>

          {/* QA Inbox */}
          <TabsContent value="qa" className="mt-0">
            <QAInbox />
          </TabsContent>

          {/* Strategic Memo Workbench */}
          <TabsContent value="memo" className="mt-0">
            <StrategicMemoWorkbench />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#27272A] py-4">
        <div className="container mx-auto px-6 text-center text-xs text-gray-500">
          Powered by 18-Agent Orchestration System | Real-time AI Campaign Management
        </div>
      </footer>
    </div>
  )
}
