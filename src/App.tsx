import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Code, Cpu, BrainCircuit, Layers, User, Search, BookOpen, ArrowUpRight } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress for the progress bar
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);

      // Set active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let currentSectionId = 'introduction';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollTop >= sectionTop) {
          currentSectionId = section.id;
        }
      });
      
      setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: <BookOpen size={20} /> },
    { id: 'capabilities', title: 'AI Capabilities', icon: <Cpu size={20} /> },
    { id: 'sdlc', title: 'Accelerating SDLC', icon: <Code size={20} /> },
    { id: 'demystified', title: 'AI Demystified', icon: <BrainCircuit size={20} /> },
    { id: 'models', title: 'AI Models & Modalities', icon: <Layers size={20} /> },
    { id: 'mindset', title: 'Mindset Shift', icon: <User size={20} /> },
    { id: 'conclusion', title: 'Conclusion', icon: <Search size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600 flex items-center">
                <BrainCircuit className="mr-2" />
                AI Engineering
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                    activeSection === section.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{section.icon}</span>
                    {section.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Content with top padding for fixed nav */}
      <div className="pt-16" ref={contentRef}>
        {/* Hero section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI in Software Engineering
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl">
              Understanding how AI is transforming the landscape of software development,
              from code generation to maintenance and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button 
                onClick={() => scrollToSection('introduction')}
                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-blue-50 transition-colors"
              >
                Start Reading <ChevronDown className="ml-2" />
              </button>
              <a 
                href="https://ai-bootcamp.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-blue-800 transition-colors"
              >
                Visit AI Bootcamp <ArrowUpRight className="ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* Table of Contents (Desktop sidebar) */}
        <div className="hidden lg:block fixed right-0 top-20 w-64 p-4 bg-white shadow-lg rounded-l-lg mt-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Contents</h3>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center w-full text-left p-2 rounded ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{section.icon}</span>
                  <span>{section.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pr-72">
          <section id="introduction" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800">Introduction</h2>
            <div className="relative mb-8 rounded-xl overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                <p className="text-sm italic">AI coding assistants are becoming an integral part of the software development process.</p>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
              <p className="text-blue-800">
                The insights and knowledge presented in this document were gained after attending the comprehensive <a href="https://ai-bootcamp.org/" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-blue-600">AI Bootcamp</a>, which provides structured training on artificial intelligence technologies and their applications in software engineering.
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              Artificial intelligence is rapidly transforming the landscape of software engineering. From auto-generating code snippets to answering design questions, AI-powered tools are giving developers new superpowers. Importantly, AI is <strong>not</strong> a replacement for human engineers, but rather an augmentation to their capabilities.
            </p>
            <p className="text-gray-700 mb-4">
              As one industry expert put it: <em>"AI won't replace developers, but developers who use AI will replace those who don't."</em> This captures why it's crucial for engineers to understand both the applications and limitations of AI.
            </p>
            <p className="text-gray-700 mb-4">
              In this document, we'll explore how AI can unlock new productivity for software teams, how it accelerates the software development lifecycle, demystify the technology behind it, survey different AI model modalities, and discuss the mindset shift developers need to adopt. By the end, you should see AI as a powerful ally in software engineering—one that can boost your efficiency and creativity, as long as you know how to use it wisely.
            </p>
          </section>

          <section id="capabilities" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">AI Unlocks Additional Capabilities for Software Engineers</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
              <p className="text-blue-800 font-medium">
                AI serves as a <strong>tool for augmentation</strong> rather than a human replacement. In practice, today's code-generating AIs function like an advanced autocomplete or an AI pair-programmer at your side.
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              AI can take over repetitive tasks, generate boilerplate code, suggest solutions, and even explain unfamiliar code. This can <strong>enhance developer productivity and creativity</strong> instead of replacing it. For example, GitHub Copilot might draft a function or translate code from one language to another, but a human developer still guides the process and verifies the result.
            </p>
            <p className="text-gray-700 mb-4">
              AI can dramatically speed up routine coding chores and free engineers to focus on higher-level problems. At the same time, it pushes engineers to work at a more abstract level—thinking through problems and strategies for the AI to execute—rather than writing every line themselves.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded">
              <h4 className="font-bold text-yellow-800 mb-2">Important Caveat</h4>
              <p className="text-yellow-800">
                AI's benefits come with a big asterisk: <strong>these tools are inherently unreliable on their own</strong>. Current AI models often produce output that <em>looks</em> plausible but can be wrong or buggy. Human oversight, especially from experienced engineers, remains essential.
              </p>
            </div>
            <p className="text-gray-700 mb-4">
              Many developers find that collaboration with AI actually <em>improves</em> their own thinking. One engineer, after pair-programming with AI for a month, noted that it <em>"forced me to think more deeply about my approach. It didn't replace my creativity—it amplified it."</em>
            </p>
            <p className="text-gray-700 mb-4">
              In real-world workflows, AI can <strong>boost productivity for knowledgeable developers</strong> who use it to speed up tasks (and then carefully review and test the results), but it <strong>cannot replace the judgment of a human expert</strong>.
            </p>
          </section>

          <section id="sdlc" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Accelerating the Software Development Lifecycle (SDLC)</h2>
            <p className="text-gray-700 mb-4">
              AI tools can significantly accelerate different phases of the software development lifecycle. Let's explore two scenarios: <strong>Bolt.new</strong> for rapid prototyping of new applications, and <strong>Windsurf</strong> for maintaining and improving existing codebases with AI-assisted IDE features.
            </p>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Bolt.new: Turbocharging Prototyping and Bootstrapping</h3>
              <div className="flex flex-col md:flex-row gap-6 mb-4">
                <div className="flex-1">
                  <p className="text-gray-700 mb-4">
                    Bolt.new is an AI-powered web development platform that exemplifies how AI can speed up the early stages of building software. Launched in 2023 by StackBlitz, Bolt.new allows developers to <em>"prompt, run, edit, and deploy full-stack apps from their browser — no local setup needed."</em>
                  </p>
                  <p className="text-gray-700 mb-4">
                    In essence, you can describe what you want to build, and the AI will generate the project's code (frontend, backend, configuration) and spin it up in a browser-based development environment.
                  </p>
                </div>
                <div className="md:w-1/3 bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">Use cases:</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Rapid prototyping</li>
                    <li>Hackathon projects</li>
                    <li>MVP development</li>
                    <li>Learning new frameworks</li>
                    <li>Concept validation</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Windsurf: AI-Powered IDE for Mature Codebases</h3>
              <p className="text-gray-700 mb-4">
                While Bolt.new helps with <em>starting</em> projects, <strong>Windsurf</strong> (an AI agentic code editor by Codeium) is designed to be beneficial throughout the entire software development lifecycle.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
                    <Code size={18} className="mr-2" /> Real-time code analysis
                  </h4>
                  <p className="text-indigo-700">
                    Continuous analysis of your code, giving instant feedback on potential bugs, anti-patterns, and performance issues.
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
                    <Layers size={18} className="mr-2" /> Automated refactoring
                  </h4>
                  <p className="text-indigo-700">
                    The AI can suggest improvements in code structure and style, or even automatically refactor code when asked.
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
                    <Search size={18} className="mr-2" /> Deep context search
                  </h4>
                  <p className="text-indigo-700">
                    Ask the AI questions about the codebase and it can navigate through the project to find relevant code or documentation.
                  </p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-bold text-indigo-800 mb-2 flex items-center">
                    <BrainCircuit size={18} className="mr-2" /> AI-powered debugging
                  </h4>
                  <p className="text-indigo-700">
                    Windsurf can run your code or tests, observe outcomes, and automatically diagnose issues and attempt fixes.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                These tools accelerate the various phases of the software development lifecycle, including planning, design, implementation, testing, deployment, and maintenance – by handling a lot of the mechanical work and analysis. They keep developers "in the zone" by reducing context-switching and by automating tedious multi-step edits.
              </p>
            </div>
          </section>

          <section id="demystified" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">AI Demystified</h2>
            <p className="text-gray-700 mb-4">
              AI can often feel like magic – it can chat with us, write code, or create images – but under the hood it's grounded in algorithms and mathematics. To effectively use AI (and trust its outputs appropriately), software engineers benefit from a basic understanding of <strong>how it works and why it fails</strong>.
            </p>
            
            <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">LLMs as predictive text generators</h3>
              <p className="text-gray-700 mb-4">
                At their core, large language models are giant predictive engines. A model like GPT-4 has been trained on massive amounts of text to do one fundamental thing: given some input text, predict what text comes next.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-gray-700 font-mono text-sm">
                  <span className="text-blue-600">Input:</span> "The cat sat on the"<br/>
                  <span className="text-green-600">Output:</span> "mat" (with high probability)
                </p>
              </div>
              <p className="text-gray-700">
                During a chat, this happens iteratively – the model predicts the next word (or part of a word), picks one, appends it to the conversation, and then repeats to predict the following token, and so on. This process continues one word at a time, which is exactly what you see when ChatGPT types out an answer word by word.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Tokens and latent space</h3>
              <p className="text-gray-700 mb-4">
                Before a model can predict text, it first converts all words (or pieces of words) into a numerical form – these are called <em>tokens</em>. Each token is represented by a high-dimensional vector (a list of numbers).
              </p>
              <p className="text-gray-700 mb-4">
                The remarkable thing is that in this latent space, <em>words with similar meanings end up with vectors that are close together</em>. For example, the vector for "cat" might be near the vector for "dog", but far from the vector for "book".
              </p>
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg w-full max-w-xl">
                  <div className="font-medium text-center mb-3 text-gray-800">Vector Math Examples in Latent Space</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div className="bg-white p-3 rounded shadow-sm">
                      vector("king") - vector("man") + vector("woman") ≈ vector("queen")
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      vector("Paris") - vector("France") + vector("Italy") ≈ vector("Rome")
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Training process: pre-training, fine-tuning, and RLHF</h3>
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="lg:w-1/3 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Pre-training</h4>
                  <p className="text-blue-700 text-sm">
                    Model learns patterns from vast amounts of text data (Wikipedia, books, websites) using next-word prediction. Builds general language understanding and knowledge.
                  </p>
                </div>
                <div className="lg:w-1/3 bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">Fine-tuning</h4>
                  <p className="text-green-700 text-sm">
                    Model is adapted to specific tasks or behaviors using targeted datasets. For example, tuning to follow instructions or specialize in coding.
                  </p>
                </div>
                <div className="lg:w-1/3 bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-bold text-amber-800 mb-2">RLHF</h4>
                  <p className="text-amber-700 text-sm">
                    Reinforcement Learning from Human Feedback. Humans rate model outputs, and the model is optimized to produce responses humans prefer.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="text-lg font-bold mb-3 text-gray-800">Pre-training Deep Dive</h4>
                  <p className="text-gray-700 mb-4">
                    Pre-training is the foundation of modern AI models. For example, GPT-3, with its 175 billion parameters, was trained on hundreds of billions of tokens from diverse sources like Wikipedia, books, and websites. During this phase, the model learns:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li>Grammar and language structure</li>
                    <li>Basic facts and knowledge</li>
                    <li>Reasoning patterns</li>
                    <li>Programming syntax and conventions</li>
                  </ul>
                  <p className="text-gray-700">
                    This phase is computationally intensive, often requiring massive GPU clusters running for weeks. The result is a general-purpose model that has broad knowledge but might not follow instructions well out-of-the-box.
                  </p>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h4 className="text-lg font-bold mb-3 text-gray-800">Fine-tuning for Specific Tasks</h4>
                  <p className="text-gray-700 mb-4">
                    After pre-training, models are refined for specific use cases. For instance, OpenAI created InstructGPT by fine-tuning GPT-3 on:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <ul className="list-none space-y-3">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">1.</span>
                        <span>Curated datasets of high-quality prompt→response pairs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">2.</span>
                        <span>Human-written examples of ideal behavior</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">3.</span>
                        <span>Supervised learning to map prompts to desired outputs</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-gray-700">
                    Remarkably, a fine-tuned 1.3B parameter model was preferred by humans over the 175B parameter base model, showing that alignment with human intent is more important than raw size.
                  </p>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h4 className="text-lg font-bold mb-3 text-gray-800">RLHF: Teaching AI What Humans Want</h4>
                  <p className="text-gray-700 mb-4">
                    RLHF is a crucial step in creating AI that aligns with human preferences. The process works like this:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-800 mb-2">Step 1: Generate Responses</h5>
                      <p className="text-sm text-gray-600">Model creates multiple responses for each prompt</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-800 mb-2">Step 2: Human Ranking</h5>
                      <p className="text-sm text-gray-600">Humans rank responses from best to worst</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-800 mb-2">Step 3: Train Reward Model</h5>
                      <p className="text-sm text-gray-600">Build model to predict human preferences</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-800 mb-2">Step 4: Optimize Model</h5>
                      <p className="text-sm text-gray-600">Use PPO to maximize reward model scores</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    This process resulted in significant improvements in ChatGPT's behavior, making it more helpful, truthful, and less likely to produce harmful content. However, it can also lead to overly verbose or cautious responses as the model tries to maximize what it learned humans prefer.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Functions and tool use by AI</h3>
              <p className="text-gray-700 mb-4">
                An exciting development is allowing AI models to <strong>call external functions or tools</strong>. Think of this as giving the model a toolbox – if it decides it needs to perform a specific action (like look something up, do math, or call an API), it can output a structured request, and the software surrounding the model will execute that request and feed the result back.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
                <pre className="text-sm">
                  <code>
{`User: "What's the weather in Singapore today?"

AI (internal): { "function": "getWeather", "arguments": {"location": "Singapore"} }

System executes: getWeather("Singapore") → {"temp": 30, "forecast": "Partly Cloudy"}

AI (to user): "It's 30°C and partly cloudy in Singapore today."`}
                  </code>
                </pre>
              </div>
              <p className="text-gray-700">
                Function calling essentially turns the model from a static text generator into a more <strong>interactive agent</strong> that can take actions.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Retrieval-Augmented Generation (RAG)</h3>
              <p className="text-gray-700 mb-4">
                Another technique to enhance AI responses is RAG, which is essentially giving the model a smart lookup ability. One big limitation of vanilla LLMs is that they can only rely on what's in their prompt (and inherent training) to answer questions. RAG fixes that by <strong>retrieving relevant information from an external source and feeding it into the prompt</strong>.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <h4 className="font-bold text-blue-800 mb-3">How RAG Works</h4>
                <div className="space-y-3">
                  <p className="text-blue-700">
                    1. Store documents in a database or vector store
                  </p>
                  <p className="text-blue-700">
                    2. When user asks a question, search for relevant passages
                  </p>
                  <p className="text-blue-700">
                    3. Add found passages to the prompt as context
                  </p>
                  <p className="text-blue-700">
                    4. LLM uses this context to formulate an accurate answer
                  </p>
                </div>
              </div>
              
              <div className="bg-white border rounded-lg p-6 mb-4">
                <h4 className="text-lg font-bold mb-3 text-gray-800">Implementation: Vector Embeddings</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Convert all documents into vectors using an embedding model</li>
                  <li>Convert user queries into vectors using the same model</li>
                  <li>Find documents whose vectors are closest to the query vector</li>
                  <li>This enables finding relevant content even without exact keyword matches</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg mb-4">
                <h4 className="font-bold text-green-800 mb-3">Example: IT Helpdesk Chatbot</h4>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded">
                    <p className="text-gray-600 italic mb-2">User Query:</p>
                    <p className="text-gray-800">"How do I get a new laptop if my current one is broken?"</p>
                  </div>
                  <div className="bg-white p-4 rounded">
                    <p className="text-gray-600 italic mb-2">System Process:</p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      <li>Converts query to vector</li>
                      <li>Finds matching policy documents</li>
                      <li>Adds relevant policies to prompt</li>
                      <li>LLM generates response using context</li>
                    </ol>
                  </div>
                  <div className="bg-white p-4 rounded">
                    <p className="text-gray-600 italic mb-2">AI Response:</p>
                    <p className="text-gray-800">"According to company policy, if your laptop is broken, you should submit a ticket to IT and you will be issued a temporary device within 1 business day while your laptop is repaired or replaced."</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                Why use RAG instead of training the model on everything? As IBM explains, LLMs are limited to their training data, and it's impractical to retrain for every company's private data or daily updates. RAG provides a way to augment the model with fresh, trusted data from knowledge bases, allowing more accurate and current responses.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <h4 className="font-bold text-yellow-800 mb-2">Important Note</h4>
                <p className="text-yellow-800">
                  RAG results are only as good as the retrieval step. If irrelevant documents are fetched, the model might still give incorrect answers, albeit confidently. Proper data indexing and prompt engineering are crucial for effective RAG implementation.
                </p>
              </div>
            </div>
          </section>

          <section id="models" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">AI Models and Modalities in Applications</h2>
            <p className="text-gray-700 mb-4">
              Not all AI is one-size-fits-all. There is a rich ecosystem of AI models tailored to different tasks and data types (modalities). It's useful to know what kinds of models are out there, and how you might choose between running something locally vs calling an API.
            </p>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Local vs. Cloud AI models</h3>
              <div className="overflow-hidden rounded-xl border border-gray-200 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-6 bg-white">
                    <h4 className="text-lg font-bold mb-3 text-gray-800">Local Models</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Complete data privacy and control</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>No ongoing API costs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>No internet dependency</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span>Limited to smaller models (resource constraints)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span>Generally less capable than top cloud models</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-6 bg-gray-50">
                    <h4 className="text-lg font-bold mb-3 text-gray-800">Cloud Models</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Access to state-of-the-art capabilities</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>No hardware requirements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Constantly improving without updates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span>Ongoing costs for API usage</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span>Data leaves your environment</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">AI Modalities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                  <div className="bg-blue-600 text-white p-4 font-bold">Text-to-Text</div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-3">
                      Input text, output text. Used for chatbots, translation, summarization, code generation.
                    </p>
                    <p className="text-gray-600 text-sm mb-2 font-medium">Examples:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">GPT-4</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Claude</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">LLaMA</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Codex</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                  <div className="bg-purple-600 text-white p-4 font-bold">Text-to-Image</div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-3">
                      Input text descriptions, output images. Used for art generation, mockups, concept visualization.
                    </p>
                    <p className="text-gray-600 text-sm mb-2 font-medium">Examples:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">DALL-E</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">Midjourney</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">Stable Diffusion</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                  <div className="bg-green-600 text-white p-4 font-bold">Text-to-Voice</div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-3">
                      Input text, output spoken audio. Used for audiobooks, voiceovers, accessibility features.
                    </p>
                    <p className="text-gray-600 text-sm mb-2 font-medium">Examples:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">ElevenLabs</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">WaveNet</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Amazon Polly</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                  <div className="bg-amber-600 text-white p-4 font-bold">Voice-to-Text</div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-3">
                      Input speech audio, output text. Used for transcription, voice commands, accessibility.
                    </p>
                    <p className="text-gray-600 text-sm mb-2 font-medium">Examples:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">Whisper</span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">Google Speech-to-Text</span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">DeepSpeech</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 mb-6">
                <div className="bg-indigo-600 text-white p-4 font-bold">Multi-modal Models</div>
                <div className="p-4">
                  <p className="text-gray-700 mb-4">
                    These advanced models can handle multiple types of input and output, combining capabilities like understanding images and text together.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-indigo-50 p-3 rounded">
                      <p className="font-medium text-indigo-800 mb-1">GPT-4 Vision</p>
                      <p className="text-sm text-gray-700">Analyzes images and text together, can describe images or answer questions about visual content.</p>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded">
                      <p className="font-medium text-indigo-800 mb-1">VALL-E</p>
                      <p className="text-sm text-gray-700">Voice cloning that can replicate a speaker's voice from a short audio sample.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="mindset" className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Personal Mindset Shift</h2>
            <p className="text-gray-700 mb-4">
              With the advent of AI in our daily workflow, software engineers are experiencing a significant <strong>mindset shift</strong> in how we approach problem-solving and our role in the development process.
            </p>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">From Code Writer to Solution Architect</h3>
              <div className="flex flex-col md:flex-row gap-8 mb-6">
                <div className="flex-1">
                  <div className="bg-red-50 p-4 rounded-lg mb-4">
                    <h4 className="font-bold text-red-800 mb-2">Traditional Approach</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">→</span>
                        <span>Write all code manually line by line</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">→</span>
                        <span>Focus on syntax and implementation details</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">→</span>
                        <span>Spend time on boilerplate and repetitive tasks</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">→</span>
                        <span>Value in knowing framework details by heart</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <h4 className="font-bold text-green-800 mb-2">AI-Augmented Approach</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">→</span>
                        <span>Design solutions and let AI implement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">→</span>
                        <span>Focus on high-level architecture and business logic</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">→</span>
                        <span>Automate routine code generation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">→</span>
                        <span>Value in knowing how to prompt and verify</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                In the AI-augmented approach, developers become more like <strong>orchestrators</strong> who guide the AI in implementing their vision, rather than doing all the typing themselves.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">New Skills for the AI Era</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Prompt Engineering</h4>
                  <p className="text-blue-700 text-sm">
                    Crafting effective prompts that clearly communicate what you want the AI to do. Learning how to provide context, examples, and constraints.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Verification & Testing</h4>
                  <p className="text-blue-700 text-sm">
                    Developing a critical eye to quickly spot mistakes in AI-generated code. Building robust testing around AI outputs.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">AI-Human Collaboration</h4>
                  <p className="text-blue-700 text-sm">
                    Finding the optimal workflow where AI handles certain tasks while humans focus on areas requiring judgment or creativity.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg mb-6">
              <div className="absolute top-0 right-0 m-2 text-4xl text-white opacity-30">"</div>
              <p className="text-lg italic mb-4">
                It didn't make me obsolete; it made me think differently.
              </p>
              <p className="text-sm">— Senior Engineer after one month of AI pair programming</p>
              <div className="absolute bottom-0 left-0 m-2 text-4xl text-white opacity-30">"</div>
            </div>
            
            <p className="text-gray-700">
              The key mindset shift is viewing AI as a <strong>partner in the development process</strong> rather than just another tool. This means being open to letting AI handle tasks that were previously core to your identity as a developer, while elevating your own role to focus more on design, verification, and the truly human aspects of software engineering.
            </p>
          </section>

          <section id="conclusion" className="mb-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Conclusion</h2>
            <p className="text-gray-700 mb-4">
              AI is rapidly becoming a cornerstone of modern software engineering, offering powerful capabilities that can transform our workflows. We've seen how AI can act as a force multiplier – from generating code and accelerating prototyping to maintaining complex systems – but we've also highlighted that it comes with caveats.
            </p>
            <p className="text-gray-700 mb-4">
              The key takeaways from this AI bootcamp are: AI is immensely powerful, but not omnipotent. It unlocks speed and efficiency, yet it remains a tool that requires human guidance, expertise, and oversight at every step.
            </p>
            <p className="text-gray-700 mb-4">
              In practical terms, this means embracing AI where it adds value – use it to draft that boilerplate, to suggest solutions, to answer questions in unfamiliar domains – while also applying rigorous verification and your own judgment. Senior engineers play a crucial role as the editors and fact-checkers of AI output, ensuring reliability and quality.
            </p>
            <p className="text-gray-700 mb-4">
              As we conclude, it's an exciting time to be a software engineer. The field is being supercharged by AI advancements, and those who learn to ride this wave will find themselves able to build things previously out of reach for a small team or individual.
            </p>
            <p className="text-gray-700 mb-4">
              The introduction of AI into our workflow is not the end of our profession but an evolution of it – much like high-level languages, open-source libraries, and cloud services evolved our profession. It's an opportunity to focus on what humans do best: creative thinking, complex decision-making, and delivering value – while letting machines handle the repetitive and the rote.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;