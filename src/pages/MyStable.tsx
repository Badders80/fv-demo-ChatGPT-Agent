import { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar';
import { AuthenticationRequired } from '../components/AuthenticationRequired';
import { useAuth } from '@futureverse/auth-react';
import { useNavigate } from 'react-router-dom';
import { useChatGPTAgent } from '../hooks/useChatGPTAgent';

interface FormData {
  ownedBefore: string;
  currentOwner: string;
  ownershipDesc: string[];
  interestSparks: string[];
  beenToRaces: string;
  involvementLevel: string;
  drawsYouIn: string[];
  bringsYouToES: string[];
  learnTopic: string;
  interestedIn: string[];
  updateFrequency: string;
  currentRegion: string;
  preferredRegions: string[];
}

interface AIQuestion {
  id: string;
  text: string;
  type: string;
}

export function MyStable() {
  const { userSession } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const { generateQuestions, loading, error } = useChatGPTAgent();
  
  const [showForm, setShowForm] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    ownedBefore: '',
    currentOwner: '',
    ownershipDesc: [],
    interestSparks: [],
    beenToRaces: '',
    involvementLevel: '',
    drawsYouIn: [],
    bringsYouToES: [],
    learnTopic: '',
    interestedIn: [],
    updateFrequency: '',
    currentRegion: '',
    preferredRegions: [],
  });
  const [aiQuestions, setAiQuestions] = useState<AIQuestion[]>([]);
  const [aiResponses, setAiResponses] = useState<Record<string, string>>({});
  const [savedProfile, setSavedProfile] = useState<any>(null);

  const totalSteps = 5 + (aiQuestions.length > 0 ? 1 : 0);

  // Show the modal when user visits MyStable page without being logged in
  useEffect(() => {
    if (!userSession) {
      setShowAuthModal(true);
    } else {
      // Check for existing profile
      const existing = localStorage.getItem(`profile_${userSession.futurepass}`);
      if (existing) {
        setSavedProfile(JSON.parse(existing));
        setShowForm(false);
      }
    }
  }, [userSession]);

  const handleCloseAuth = () => {
    setShowAuthModal(false);
    navigate('/');
  };

  const handleShowAuth = () => {
    setShowAuthModal(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handlePrev = () => setCurrentStep(prev => prev - 1);

  const handleGenerateAI = async () => {
    const newQuestions = await generateQuestions(formData);
    setAiQuestions(newQuestions);
    if (newQuestions.length > 0) {
      handleNext();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullData = { ...formData, aiResponses, timestamp: new Date().toISOString() };
    localStorage.setItem(`profile_${userSession?.futurepass}`, JSON.stringify(fullData));
    setSavedProfile(fullData);
    setShowForm(false);
  };

  if (!userSession) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#f1f3f4', 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%'
      }}>
        <NavBar />
        <div style={{ 
          flex: 1,
          width: '100%',
          maxWidth: 'min(90vw, 800px)', 
          margin: '0 auto', 
          padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 2rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 100px)',
          boxSizing: 'border-box'
        }}>
          <section style={{ 
            width: '100%',
            padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)', 
            background: '#fff', 
            borderRadius: '12px', 
            border: '1px solid #e9ecef',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              fontWeight: '300', 
              color: '#212529', 
              marginBottom: '2rem',
              letterSpacing: '-0.02em'
            }}>
              My Stable
            </h1>
            <div style={{ 
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <p style={{ 
                fontSize: 'clamp(1rem, 2.2vw, 1.4rem)', 
                color: '#6c757d', 
                lineHeight: '1.7',
                marginBottom: '2rem',
                fontWeight: '300'
              }}>
                Please sign in to view your stable and manage your assets.
              </p>
              <button 
                onClick={handleShowAuth}
                style={{
                  padding: '1rem 2rem',
                  background: '#4f46e5',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '400',
                  letterSpacing: '0.02em'
                }}
              >
                Get Started
              </button>
            </div>
          </section>
        </div>
        {!userSession && showAuthModal && <AuthenticationRequired onClose={handleCloseAuth} />}
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f1f3f4', 
      display: 'flex', 
      flexDirection: 'column',
      width: '100%'
    }}>
      <NavBar />
      <div style={{ 
        flex: 1,
        width: '100%',
        maxWidth: 'min(90vw, 800px)', 
        margin: '0 auto', 
        padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 2rem)',
        minHeight: 'calc(100vh - 100px)',
        boxSizing: 'border-box'
      }}>
        <section style={{ 
          width: '100%',
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)', 
          background: '#fff', 
          borderRadius: '12px', 
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: '300', 
            color: '#212529', 
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            textAlign: 'center'
          }}>
            My Stable
          </h1>
          
          <div style={{ 
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            textAlign: 'center'
          }}>
            {userSession && (
              <>
                <p style={{ 
                  fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', 
                  color: '#6c757d', 
                  lineHeight: '1.6',
                  marginBottom: '0.8rem',
                  fontWeight: '300'
                }}>
                  Futurepass: {userSession?.futurepass}
                </p>
                <p style={{ 
                  fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', 
                  color: '#6c757d', 
                  lineHeight: '1.6',
                  marginBottom: '2rem',
                  fontWeight: '300'
                }}>
                  User ID: {userSession?.user?.profile?.sub || 'N/A'}
                </p>
              </>
            )}
          </div>

          {showForm ? (
            <div style={{ maxWidth: '600px', margin: 'auto' }}>
              <h2 style={{ 
                fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                fontWeight: '400', 
                color: '#212529', 
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                Create Your Profile
              </h2>
              <p style={{ 
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', 
                color: '#6c757d', 
                textAlign: 'center', 
                marginBottom: '2rem',
                fontWeight: '300'
              }}>
                Answer these questions to personalize your experience (optional).
              </p>
              
              {/* Progress Bar */}
              <div style={{ 
                background: '#f0f0f0', 
                height: '8px', 
                borderRadius: '4px', 
                marginBottom: '2rem',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${(currentStep / totalSteps) * 100}%`, 
                  background: '#4f46e5', 
                  height: '100%', 
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Horse Ownership Experience */}
                {currentStep === 1 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem', color: '#212529' }}>
                      Horse Ownership Experience
                    </h3>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                        Have you owned horses before?
                      </label>
                      <select 
                        value={formData.ownedBefore} 
                        onChange={(e) => handleChange('ownedBefore', e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #e9ecef', 
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      >
                        <option value="">Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="considering">Considering it</option>
                      </select>
                    </div>

                    {formData.ownedBefore === 'yes' && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                          Are you currently an owner?
                        </label>
                        <select 
                          value={formData.currentOwner} 
                          onChange={(e) => handleChange('currentOwner', e.target.value)}
                          style={{ 
                            width: '100%', 
                            padding: '0.75rem', 
                            border: '1px solid #e9ecef', 
                            borderRadius: '6px',
                            fontSize: '1rem'
                          }}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No, but have been</option>
                        </select>
                      </div>
                    )}

                    {(formData.ownedBefore === 'yes' || formData.ownedBefore === 'considering') && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                          What type of ownership interests you? (Select all that apply)
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {['Full ownership', 'Syndicate/partnership', 'Leasing', 'Share ownership'].map(option => (
                            <label key={option} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                              <input 
                                type="checkbox" 
                                checked={formData.ownershipDesc.includes(option)}
                                onChange={() => handleMultiSelect('ownershipDesc', option)}
                                style={{ marginRight: '0.5rem' }}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.ownedBefore === 'no' && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                          What sparked your interest in horse racing? (Select all that apply)
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {['Attending races', 'Watching on TV', 'Family/friends involved', 'Investment opportunity', 'Love of horses'].map(option => (
                            <label key={option} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                              <input 
                                type="checkbox" 
                                checked={formData.interestSparks.includes(option)}
                                onChange={() => handleMultiSelect('interestSparks', option)}
                                style={{ marginRight: '0.5rem' }}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Racing Experience */}
                {currentStep === 2 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem', color: '#212529' }}>
                      Racing Experience
                    </h3>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                        Have you been to horse races before?
                      </label>
                      <select 
                        value={formData.beenToRaces} 
                        onChange={(e) => handleChange('beenToRaces', e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #e9ecef', 
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      >
                        <option value="">Select an option</option>
                        <option value="regularly">Yes, regularly</option>
                        <option value="occasionally">Yes, occasionally</option>
                        <option value="once">Yes, once or twice</option>
                        <option value="never">Never, but interested</option>
                        <option value="not-interested">Not interested in attending</option>
                      </select>
                    </div>

                    {(formData.beenToRaces && formData.beenToRaces !== 'never' && formData.beenToRaces !== 'not-interested') && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                          How would you describe your level of involvement?
                        </label>
                        <select 
                          value={formData.involvementLevel} 
                          onChange={(e) => handleChange('involvementLevel', e.target.value)}
                          style={{ 
                            width: '100%', 
                            padding: '0.75rem', 
                            border: '1px solid #e9ecef', 
                            borderRadius: '6px',
                            fontSize: '1rem'
                          }}
                        >
                          <option value="">Select an option</option>
                          <option value="casual-fan">Casual fan/social experience</option>
                          <option value="serious-punter">Serious punter/bettor</option>
                          <option value="industry-connected">Industry connected</option>
                          <option value="owner-trainer">Owner/trainer/jockey</option>
                        </select>
                      </div>
                    )}

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                        What draws you to horse racing? (Select all that apply)
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['The thrill of competition', 'The beauty of the horses', 'Social atmosphere', 'Betting/gambling', 'Investment potential', 'Tradition and history'].map(option => (
                          <label key={option} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input 
                              type="checkbox" 
                              checked={formData.drawsYouIn.includes(option)}
                              onChange={() => handleMultiSelect('drawsYouIn', option)}
                              style={{ marginRight: '0.5rem' }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Evolution Stables Interest */}
                {currentStep === 3 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem', color: '#212529' }}>
                      Evolution Stables Interest
                    </h3>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                        What brings you to Evolution Stables? (Select all that apply)
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['Digital ownership opportunity', 'Blockchain/NFT interest', 'Lower barrier to entry', 'Community aspect', 'Gaming/entertainment', 'Investment potential'].map(option => (
                          <label key={option} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input 
                              type="checkbox" 
                              checked={formData.bringsYouToES.includes(option)}
                              onChange={() => handleMultiSelect('bringsYouToES', option)}
                              style={{ marginRight: '0.5rem' }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                        What would you most like to learn about?
                      </label>
                      <select 
                        value={formData.learnTopic} 
                        onChange={(e) => handleChange('learnTopic', e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #e9ecef', 
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      >
                        <option value="">Select a topic</option>
                        <option value="horse-form">Horse form and racing analysis</option>
                        <option value="breeding">Breeding and bloodlines</option>
                        <option value="ownership-economics">Ownership economics</option>
                        <option value="training-process">Training process</option>
                        <option value="digital-ownership">Digital ownership mechanics</option>
                        <option value="community-features">Community features</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 4: Engagement Preferences */}
                {currentStep === 4 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem', color: '#212529' }}>
                      Engagement Preferences
                    </h3>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                        What are you most interested in? (Select all that apply)
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['Live race updates', 'Training updates', 'Breeding information', 'Community discussions', 'Performance analytics', 'Market insights'].map(option => (
                          <label key={option} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input 
                              type="checkbox" 
                              checked={formData.interestedIn.includes(option)}
                              onChange={() => handleMultiSelect('interestedIn', option)}
                              style={{ marginRight: '0.5rem' }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                        How often would you like to receive updates?
                      </label>
                      <select 
                        value={formData.updateFrequency} 
                        onChange={(e) => handleChange('updateFrequency', e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #e9ecef', 
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      >
                        <option value="">Select frequency</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="race-days">Only on race days</option>
                        <option value="minimal">Minimal updates</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 5: Regional Preferences */}
                {currentStep === 5 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem', color: '#212529' }}>
                      Regional Preferences
                    </h3>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                        What region are you currently in?
                      </label>
                      <select 
                        value={formData.currentRegion} 
                        onChange={(e) => handleChange('currentRegion', e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem', 
                          border: '1px solid #e9ecef', 
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      >
                        <option value="">Select your region</option>
                        <option value="australia">Australia</option>
                        <option value="nz">New Zealand</option>
                        <option value="uk">United Kingdom</option>
                        <option value="usa">United States</option>
                        <option value="canada">Canada</option>
                        <option value="asia">Asia</option>
                        <option value="europe">Europe</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                        Which racing regions interest you most? (Select all that apply)
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {['Australia', 'New Zealand', 'United Kingdom', 'United States', 'Japan', 'Hong Kong', 'Middle East', 'Europe'].map(option => (
                          <label key={option} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <input 
                              type="checkbox" 
                              checked={formData.preferredRegions.includes(option)}
                              onChange={() => handleMultiSelect('preferredRegions', option)}
                              style={{ marginRight: '0.5rem' }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: AI-Generated Questions */}
                {currentStep === 6 && aiQuestions.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem', color: '#212529' }}>
                      AI-Tailored Questions
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: '#6c757d', marginBottom: '1.5rem' }}>
                      Based on your answers, here are some personalized questions:
                    </p>
                    {aiQuestions.map((q) => (
                      <div key={q.id} style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#495057' }}>
                          {q.text}
                        </label>
                        <input 
                          type={q.type || 'text'}
                          value={aiResponses[q.id] || ''}
                          onChange={(e) => setAiResponses(prev => ({ ...prev, [q.id]: e.target.value }))}
                          style={{ 
                            width: '100%', 
                            padding: '0.75rem', 
                            border: '1px solid #e9ecef', 
                            borderRadius: '6px',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '2rem',
                  gap: '1rem'
                }}>
                  <div>
                    {currentStep > 1 && (
                      <button 
                        type="button" 
                        onClick={handlePrev}
                        style={{ 
                          padding: '0.75rem 1.5rem', 
                          background: '#6c757d', 
                          color: '#fff', 
                          border: 'none', 
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '500'
                        }}
                      >
                        Previous
                      </button>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {currentStep < 5 && (
                      <button 
                        type="button" 
                        onClick={handleNext}
                        style={{ 
                          padding: '0.75rem 1.5rem', 
                          background: '#4f46e5', 
                          color: '#fff', 
                          border: 'none', 
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '500'
                        }}
                      >
                        Next
                      </button>
                    )}
                    
                    {currentStep === 5 && (
                      <button 
                        type="button" 
                        onClick={handleGenerateAI}
                        disabled={loading}
                        style={{ 
                          padding: '0.75rem 1.5rem', 
                          background: loading ? '#9ca3af' : '#4f46e5', 
                          color: '#fff', 
                          border: 'none', 
                          borderRadius: '6px',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          fontSize: '1rem',
                          fontWeight: '500'
                        }}
                      >
                        {loading ? 'Generating...' : 'Enhance with AI'}
                      </button>
                    )}
                    
                    {(currentStep === 5 || (currentStep === 6 && aiQuestions.length > 0)) && (
                      <button 
                        type="submit"
                        style={{ 
                          padding: '0.75rem 1.5rem', 
                          background: '#28a745', 
                          color: '#fff', 
                          border: 'none', 
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '500'
                        }}
                      >
                        Submit Profile
                      </button>
                    )}
                  </div>
                </div>

                {loading && (
                  <p style={{ textAlign: 'center', color: '#4f46e5', marginTop: '1rem' }}>
                    Generating AI questions...
                  </p>
                )}
                
                {error && (
                  <p style={{ textAlign: 'center', color: '#dc3545', marginTop: '1rem' }}>
                    Error: {error}
                  </p>
                )}
              </form>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ 
                fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                fontWeight: '400', 
                color: '#212529', 
                marginBottom: '2rem'
              }}>
                Your Profile Summary
              </h2>
              
              {savedProfile && (
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '1.5rem', 
                  borderRadius: '8px', 
                  marginBottom: '2rem',
                  textAlign: 'left'
                }}>
                  <h3 style={{ marginBottom: '1rem', color: '#495057' }}>Profile Details:</h3>
                  <p><strong>Horse Ownership:</strong> {savedProfile.ownedBefore}</p>
                  {savedProfile.currentOwner && <p><strong>Current Owner:</strong> {savedProfile.currentOwner}</p>}
                  {savedProfile.beenToRaces && <p><strong>Racing Experience:</strong> {savedProfile.beenToRaces}</p>}
                  {savedProfile.currentRegion && <p><strong>Region:</strong> {savedProfile.currentRegion}</p>}
                  {savedProfile.updateFrequency && <p><strong>Update Frequency:</strong> {savedProfile.updateFrequency}</p>}
                  <p><strong>Created:</strong> {new Date(savedProfile.timestamp).toLocaleDateString()}</p>
                </div>
              )}
              
              <button 
                onClick={() => setShowForm(true)}
                style={{ 
                  padding: '0.75rem 1.5rem', 
                  background: '#4f46e5', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                Edit Profile
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
