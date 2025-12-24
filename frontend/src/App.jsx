import { useState } from 'react'
import { analyzeUrl } from './api'

function App() {
    const [url, setUrl] = useState('')
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleAnalyze = async () => {
        if (!url) return;
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const data = await analyzeUrl(url);
            setResult(data);
        } catch (err) {
            setError("Failed to analyze URL. Please check the backend connection.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative min-h-screen flex flex-col font-display bg-background-light text-text-main antialiased overflow-x-hidden">


            <main className="flex-grow flex flex-col">
                {/* Hero Section */}
                <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 px-4 overflow-hidden bg-background-light">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none -z-10"></div>
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold mb-8 animate-fade-in-up">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Live Threat Detection System
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-slate-900">
                            Verify before you <span className="text-primary">click.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-text-body mb-10 max-w-2xl mx-auto leading-relaxed">
                            Instant AI-powered analysis for phishing scams, fraudulent domains, and zero-day threats. Secure your browsing in milliseconds.
                        </p>

                        <div className="relative max-w-2xl mx-auto group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative flex items-center bg-white rounded-xl border border-border-light shadow-xl shadow-slate-200/50 p-2">
                                <div className="pl-4 pr-2 text-slate-400">
                                    <span className="material-symbols-outlined">link</span>
                                </div>
                                <input
                                    className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-slate-900 placeholder-slate-400 text-base md:text-lg h-12 w-full"
                                    placeholder="Paste suspicious URL here (e.g., amazon-security-check.com)..."
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                                />
                                <button
                                    onClick={handleAnalyze}
                                    disabled={loading}
                                    className="hidden sm:flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-8 h-12 rounded-lg font-bold transition-all transform hover:scale-[1.02] shadow-md shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Scanning...' : 'Analyze'}
                                </button>
                                <button
                                    onClick={handleAnalyze}
                                    disabled={loading}
                                    className="sm:hidden flex items-center justify-center bg-primary hover:bg-primary-dark text-white w-12 h-12 rounded-lg font-bold transition-all disabled:opacity-70"
                                >
                                    <span className="material-symbols-outlined">{loading ? 'hourglass_top' : 'search'}</span>
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg max-w-2xl mx-auto border border-red-100 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">error</span>
                                {error}
                            </div>
                        )}

                        <p className="mt-4 text-sm text-slate-500">
                            <span className="material-symbols-outlined align-middle text-[16px] mr-1">lock</span>
                            Your search is private and encrypted.
                        </p>
                    </div>
                </section>



                {/* Results / How It Works / Details Section */}
                {result ? (
                    <section className="py-20 bg-white border-y border-border-light">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col lg:flex-row items-center gap-16">
                                {/* Left Content - Dynamic based on result */}
                                <div className="lg:w-1/2">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6 ${result.status === 'Safe' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                        Analysis Complete
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                                        Analysis Result: <span className={result.status === 'Safe' ? 'text-green-600' : 'text-red-600'}>{result.status}</span>
                                    </h2>
                                    <p className="text-lg text-text-body mb-8 leading-relaxed">
                                        We have analyzed the URL structure and content patterns using our hybrid AI engine.
                                        Here is the breakdown of the risk assessment.
                                    </p>
                                    <ul className="space-y-6">
                                        <li className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-xl">smart_toy</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-lg mb-1">AI Semantic Score</h4>
                                                <p className="text-slate-600 text-sm">DistilBERT analysis of text/URL patterns: {result.details.ai_score}% Risk</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-xl">account_tree</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-lg mb-1">Structure Analysis</h4>
                                                <p className="text-slate-600 text-sm">Random Forest feature extraction: {result.details.ml_score}% Risk</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* Right Card - Score Display */}
                                <div className="lg:w-1/2 relative w-full px-4 md:px-0">
                                    <div className={`absolute -inset-4 bg-gradient-to-r rounded-2xl blur-2xl opacity-10 animate-float ${result.status === 'Safe' ? 'from-green-500 to-emerald-400' : 'from-red-500 to-orange-400'}`}></div>
                                    <div className="relative bg-white border border-border-light rounded-2xl shadow-2xl shadow-slate-200/50 p-6 md:p-8">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${result.status === 'Safe' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                <span className="material-symbols-outlined">{result.status === 'Safe' ? 'verified_user' : 'warning'}</span>
                                            </div>
                                            <div>
                                                <div className="text-sm text-slate-500">Confidence Score</div>
                                                <div className={`text-2xl font-bold ${result.status === 'Safe' ? 'text-green-700' : 'text-red-700'}`}>
                                                    {result.confidence_score}% {result.status === 'Safe' ? 'Safe' : 'Risk'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                                <span className="text-sm font-medium text-slate-700">Risk Level</span>
                                                <span className={`text-xs font-bold px-2 py-1 rounded ${result.risk_level === 'Low' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {result.risk_level}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                                <span className="text-sm font-medium text-slate-700">Database Check</span>
                                                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">Completed</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    /* Default "How It Works" Section when no result */
                    <section className="py-20 bg-background-subtle relative overflow-hidden">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl font-bold tracking-tight mb-4 text-slate-900">How It Works</h2>
                                <p className="text-text-body max-w-2xl mx-auto">
                                    Three simple steps to verify the safety of any website instantly.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10"></div>
                                <div className="flex flex-col items-center text-center group">
                                    <div className="relative mb-6">
                                        <div className="w-24 h-24 rounded-full bg-white border border-slate-100 shadow-soft flex items-center justify-center text-primary group-hover:border-primary/50 group-hover:shadow-glow transition-all duration-300">
                                            <span className="material-symbols-outlined text-4xl">add_link</span>
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center font-bold text-sm shadow-md">1</div>
                                    </div>
                                    <h3 class="text-xl font-bold mb-3 text-slate-900">Paste URL</h3>
                                    <p className="text-text-body leading-relaxed text-sm">
                                        Copy the suspicious link from your email or browser and paste it securely above.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center text-center group">
                                    <div className="relative mb-6">
                                        <div className="w-24 h-24 rounded-full bg-white border border-slate-100 shadow-soft flex items-center justify-center text-primary group-hover:border-primary/50 group-hover:shadow-glow transition-all duration-300">
                                            <span className="material-symbols-outlined text-4xl">smart_toy</span>
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center font-bold text-sm shadow-md">2</div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900">AI Analysis</h3>
                                    <p className="text-text-body leading-relaxed text-sm">
                                        Our engines analyze the domain, SSL status, and code patterns for hidden threats.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center text-center group">
                                    <div className="relative mb-6">
                                        <div className="w-24 h-24 rounded-full bg-white border border-slate-100 shadow-soft flex items-center justify-center text-primary group-hover:border-primary/50 group-hover:shadow-glow transition-all duration-300">
                                            <span className="material-symbols-outlined text-4xl">verified_user</span>
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center font-bold text-sm shadow-md">3</div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900">Get Result</h3>
                                    <p className="text-text-body leading-relaxed text-sm">
                                        Receive an instant safety score and detailed report on potential risks.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Features / Marketing Section */}
                <section className="py-20 lg:py-24 bg-background-subtle">
                    {/* ... (Keeping the advanced protection layer section) ... */}
                    {/* Shortcut for brevity: I'll include the Advanced Protection Layer from the original HTML but simplified slightly to save tokens if needed, but I'll aim for fidelity */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Advanced Protection Layer</h2>
                            <p className="text-text-body max-w-2xl mx-auto">
                                We combine traditional blacklist checking with next-gen AI heuristics.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="group relative bg-white rounded-xl p-8 border border-border-light hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>radar</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">Real-time Scanning</h3>
                                <p className="text-slate-600 leading-relaxed">Instant analysis of URL structure and content.</p>
                            </div>
                            {/* Feature 2 */}
                            <div className="group relative bg-white rounded-xl p-8 border border-border-light hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>psychology</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">AI Pattern Recognition</h3>
                                <p className="text-slate-600 leading-relaxed">ML models trained to detect zero-day phishing.</p>
                            </div>
                            {/* Feature 3 */}
                            <div className="group relative bg-white rounded-xl p-8 border border-border-light hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>group_add</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-slate-900">Community Blacklist</h3>
                                <p className="text-slate-600 leading-relaxed">Leveraging real-time global security feeds.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Visualization Section */}
                <section className="relative h-64 md:h-80 w-full overflow-hidden flex items-center justify-center bg-primary">
                    <div className="absolute inset-0 opacity-10 mix-blend-screen" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWnKiBjcgFWvA9MG2oOZrT2tsImnPAjOKXqR0kHxj7WeO9iz2g8MrCi6chK58IIZ465eMYpStaj7QbK2_z-qrjOPs6SWKA7RhEi6yA7OUoojRhm32NhZZDcQnqNm1jKbbjC8zuqsP8ozKmc-ch8Ho6OodRgiUeFOFAg6V_QEa8Qtr8uWlKJ1yazP96_Hx2iKewIbqZCzLbOnUW4EU6ZOowDQ0NHurUCfl9QCzWvTQghuoAwhBGi8coiwCWiMeWirynY5jTrVI2kYY')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-primary-dark opacity-40"></div>
                    <div className="relative z-10 text-center px-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Trusted by security teams worldwide</h2>
                        <div className="flex justify-center gap-8 text-white/90">
                            <div className="flex items-center gap-2"><span className="material-symbols-outlined">verified</span><span className="font-bold">SecurCorp</span></div>
                            <div className="flex items-center gap-2"><span className="material-symbols-outlined">shield</span><span className="font-bold">GuardNet</span></div>
                            <div className="flex items-center gap-2"><span className="material-symbols-outlined">lock</span><span className="font-bold">SafeWeb</span></div>
                        </div>
                    </div>
                </section>
            </main>


        </div>
    )
}

export default App
