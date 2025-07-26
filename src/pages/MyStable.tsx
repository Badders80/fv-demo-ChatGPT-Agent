import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import { useAuth } from '@futureverse/auth-react';

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

export function MyStable() {
  const { userSession } = useAuth();
  const [showForm, setShowForm] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5; // Fixed for 5 core steps; branches are inline
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked 
          ? [...(prev[name as keyof FormData] as string[]), value]
          : (prev[name as keyof FormData] as string[]).filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrev = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(`profile_${userSession?.futurepass}`, JSON.stringify(formData));
    setShowForm(false);
  };

  const handleSkip = () => setShowForm(false);

  if (!userSession) return <div>Authenticating...</div>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <NavBar />
      <section style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>My Stable</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Wallet: {userSession.futurepass}</p>

        {showForm ? (
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Create Your Profile</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>Help us tailor your experience—answer a few quick questions! Data used for personalization—view privacy policy.</p>
            <div style={{ background: '#f0f0f0', height: '6px', borderRadius: '3px', marginBottom: '1.5rem' }}>
              <div style={{ width: `${(currentStep / totalSteps) * 100}%`, background: '#4f46e5', height: '100%', borderRadius: '3px' }}></div>
            </div>
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Have you ever owned a horse or stable-related asset before?</label>
                  <div style={{ marginBottom: '1rem' }}>
                    <label><input type="radio" name="ownedBefore" value="yes" onChange={handleChange} checked={formData.ownedBefore === 'yes'} /> Yes</label><br />
                    <label><input type="radio" name="ownedBefore" value="no" onChange={handleChange} checked={formData.ownedBefore === 'no'} /> No</label><br />
                    <label><input type="radio" name="ownedBefore" value="preferNot" onChange={handleChange} checked={formData.ownedBefore === 'preferNot'} /> Prefer not to say</label>
                  </div>

                  {formData.ownedBefore === 'yes' && (
                    <div style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Do you currently own one?</label>
                      <div style={{ marginBottom: '1rem' }}>
                        <label><input type="radio" name="currentOwner" value="yes" onChange={handleChange} checked={formData.currentOwner === 'yes'} /> Yes</label><br />
                        <label><input type="radio" name="currentOwner" value="no" onChange={handleChange} checked={formData.currentOwner === 'no'} /> No</label>
                      </div>

                      {(formData.currentOwner === 'yes' || formData.currentOwner === 'no') && (
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>What best describes your past/present ownership? (Select all that apply)</label>
                          <div>
                            <label><input type="checkbox" name="ownershipDesc" value="hobby" onChange={handleChange} checked={formData.ownershipDesc.includes('hobby')} /> Hobby/leisure</label><br />
                            <label><input type="checkbox" name="ownershipDesc" value="professional" onChange={handleChange} checked={formData.ownershipDesc.includes('professional')} /> Professional/competitive</label><br />
                            <label><input type="checkbox" name="ownershipDesc" value="investment" onChange={handleChange} checked={formData.ownershipDesc.includes('investment')} /> Investment for returns</label><br />
                            <label><input type="checkbox" name="ownershipDesc" value="family" onChange={handleChange} checked={formData.ownershipDesc.includes('family')} /> Family tradition</label><br />
                            <label><input type="checkbox" name="ownershipDesc" value="digital" onChange={handleChange} checked={formData.ownershipDesc.includes('digital')} /> Digital/Web3 assets</label><br />
                            <label><input type="checkbox" name="ownershipDesc" value="other" onChange={handleChange} checked={formData.ownershipDesc.includes('other')} /> Other (details: <input type="text" name="ownershipOther" onChange={handleChange} style={{ marginLeft: '0.5rem' }} />)</label>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {formData.ownedBefore === 'no' && (
                    <div style={{ marginLeft: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>What sparks your interest in ownership? (Select all that apply)</label>
                      <div>
                        <label><input type="checkbox" name="interestSparks" value="curiosity" onChange={handleChange} checked={formData.interestSparks.includes('curiosity')} /> Curiosity about horses/stables</label><br />
                        <label><input type="checkbox" name="interestSparks" value="financial" onChange={handleChange} checked={formData.interestSparks.includes('financial')} /> Potential financial upside</label><br />
                        <label><input type="checkbox" name="interestSparks" value="lifestyle" onChange={handleChange} checked={formData.interestSparks.includes('lifestyle')} /> Lifestyle appeal</label><br />
                        <label><input type="checkbox" name="interestSparks" value="other" onChange={handleChange} checked={formData.interestSparks.includes('other')} /> Other (details: <input type="text" name="interestOther" onChange={handleChange} style={{ marginLeft: '0.5rem' }} />)</label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Have you ever been to horse races or followed racing events?</label>
                  <div style={{ marginBottom: '1rem' }}>
                    <label><input type="radio" name="beenToRaces" value="yesInPerson" onChange={handleChange} checked={formData.beenToRaces === 'yesInPerson'} /> Yes, in person</label><br />
                    <label><input type="radio" name="beenToRaces" value="yesOnline" onChange={handleChange} checked={formData.beenToRaces === 'yesOnline'} /> Yes, online/streaming</label><br />
                    <label><input type="radio" name="beenToRaces" value="noInterested" onChange={handleChange} checked={formData.beenToRaces === 'noInterested'} /> No, but interested</label><br />
                    <label><input type="radio" name="beenToRaces" value="noNot" onChange={handleChange} checked={formData.beenToRaces === 'noNot'} /> No, not interested</label>
                  </div>

                  {(formData.beenToRaces === 'yesInPerson' || formData.beenToRaces === 'yesOnline') && (
                    <div style={{ marginLeft: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>How would you describe your involvement level?</label>
                      <div>
                        <label><input type="radio" name="involvementLevel" value="superFan" onChange={handleChange} checked={formData.involvementLevel === 'superFan'} /> Super fan—can't get enough, follow every race</label><br />
                        <label><input type="radio" name="involvementLevel" value="enthusiast" onChange={handleChange} checked={formData.involvementLevel === 'enthusiast'} /> Enthusiast—regularly involved</label><br />
                        <label><input type="radio" name="involvementLevel" value="casual" onChange={handleChange} checked={formData.involvementLevel === 'casual'} /> Casual—occasionally watch</label><br />
                        <label><input type="radio" name="involvementLevel" value="other" onChange={handleChange} checked={formData.involvementLevel === 'other'} /> Other (details: <input type="text" name="involvementOther" onChange={handleChange} style={{ marginLeft: '0.5rem' }} />)</label>
                      </div>
                    </div>
                  )}

                  {formData.beenToRaces === 'noInterested' && (
                    <div style={{ marginLeft: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>What draws you in? (Select all that apply)</label>
                      <div>
                        <label><input type="checkbox" name="drawsYouIn" value="excitement" onChange={handleChange} checked={formData.drawsYouIn.includes('excitement')} /> Excitement of the sport</label><br />
                        <label><input type="checkbox" name="drawsYouIn" value="social" onChange={handleChange} checked={formData.drawsYouIn.includes('social')} /> Social/community aspect</label><br />
                        <label><input type="checkbox" name="drawsYouIn" value="learning" onChange={handleChange} checked={formData.drawsYouIn.includes('learning')} /> Learning potential</label><br />
                        <label><input type="checkbox" name="drawsYouIn" value="other" onChange={handleChange} checked={formData.drawsYouIn.includes('other')} /> Other (details: <input type="text" name="drawsOther" onChange={handleChange} style={{ marginLeft: '0.5rem' }} />)</label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>What brings you to Evolution Stables? (Select up to 4)</label>
                  <div style={{ marginBottom: '1rem' }}>
                    <label><input type="checkbox" name="bringsYouToES" value="excitementOwner" onChange={handleChange} checked={formData.bringsYouToES.includes('excitementOwner')} /> Excitement of being an owner</label><br />
                    <label><input type="checkbox" name="bringsYouToES" value="financial" onChange={handleChange} checked={formData.bringsYouToES.includes('financial')} /> Potential financial returns</label><br />
                    <label><input type="checkbox" name="bringsYouToES" value="community" onChange={handleChange} checked={formData.bringsYouToES.includes('community')} /> Building community connections</label><br />
                    <label><input type="checkbox" name="bringsYouToES" value="learning" onChange={handleChange} checked={formData.bringsYouToES.includes('learning')} /> Learning about horse racing/ownership</label><br />
                    <label><input type="checkbox" name="bringsYouToES" value="digital" onChange={handleChange} checked={formData.bringsYouToES.includes('digital')} /> Exploring digital assets</label><br />
                    <label><input type="checkbox" name="bringsYouToES" value="curiosity" onChange={handleChange} checked={formData.bringsYouToES.includes('curiosity')} /> Curiosity about stables</label><br />
                    <label><input type="checkbox" name="bringsYouToES" value="other" onChange={handleChange} checked={formData.bringsYouToES.includes('other')} /> Other (details: <input type="text" name="bringsOther" onChange={handleChange} style={{ marginLeft: '0.5rem' }} />)</label>
                  </div>

                  {formData.bringsYouToES.includes('learning') && (
                    <div style={{ marginLeft: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>What's one topic you'd like to learn more about?</label>
                      <input type="text" name="learnTopic" onChange={handleChange} value={formData.learnTopic} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>What things are you most interested in hearing about? (Select up to 5)</label>
                  <div style={{ marginBottom: '1rem' }}>
                    <label><input type="checkbox" name="interestedIn" value="forSale" onChange={handleChange} checked={formData.interestedIn.includes('forSale')} /> Horses or stables for sale</label><br />
                    <label><input type="checkbox" name="interestedIn" value="education" onChange={handleChange} checked={formData.interestedIn.includes('education')} /> Education about ownership (e.g., beginner guides)</label><br />
                    <label><input type="checkbox" name="interestedIn" value="racingTips" onChange={handleChange} checked={formData.interestedIn.includes('racingTips')} /> Racing tips and strategies</label><br />
                    <label><input type="checkbox" name="interestedIn" value="communityEvents" onChange={handleChange} checked={formData.interestedIn.includes('communityEvents')} /> Community events or meetups</label><br />
                    <label><input type="checkbox" name="interestedIn" value="assetManagement" onChange={handleChange} checked={formData.interestedIn.includes('assetManagement')} /> Asset management tools</label><br />
                    <label><input type="checkbox" name="interestedIn" value="industryNews" onChange={handleChange} checked={formData.interestedIn.includes('industryNews')} /> Industry news and updates</label><br />
                    <label><input type="checkbox" name="interestedIn" value="digitalTrends" onChange={handleChange} checked={formData.interestedIn.includes('digitalTrends')} /> Digital/Web3 ownership trends</label><br />
                    <label><input type="checkbox" name="interestedIn" value="other" onChange={handleChange} checked={formData.interestedIn.includes('other')} /> Other (details: <input type="text" name="interestedOther" onChange={handleChange} style={{ marginLeft: '0.5rem' }} />)</label>
                  </div>

                  {(formData.interestedIn.includes('racingTips') || formData.interestedIn.includes('communityEvents')) && (
                    <div style={{ marginLeft: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>How often would you want updates?</label>
                      <div>
                        <label><input type="radio" name="updateFrequency" value="rarely" onChange={handleChange} checked={formData.updateFrequency === 'rarely'} /> Rarely</label><br />
                        <label><input type="radio" name="updateFrequency" value="occasionally" onChange={handleChange} checked={formData.updateFrequency === 'occasionally'} /> Occasionally</label><br />
                        <label><input type="radio" name="updateFrequency" value="frequently" onChange={handleChange} checked={formData.updateFrequency === 'frequently'} /> Frequently</label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 5 && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>What is your current region (where do you live)?</label>
                  <select name="currentRegion" onChange={handleChange} value={formData.currentRegion} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem' }}>
                    <option value="">Select an option</option>
                    <option value="anz">Australia/New Zealand (ANZ)</option>
                    <option value="asia">Asia (incl. Japan/China/SE Asia)</option>
                    <option value="northAmerica">North America (USA/Canada)</option>
                    <option value="centralSouthAmerica">Central & South America (incl. Mexico/Brazil/Argentina)</option>
                    <option value="middleEast">Middle East (incl. UAE/Saudi)</option>
                    <option value="europe">Europe (incl. UK/France/Germany)</option>
                    <option value="africa">Africa</option>
                    <option value="other">Other</option>
                  </select>

                  {formData.currentRegion === 'other' && (
                    <input type="text" name="currentRegionOther" onChange={handleChange} placeholder="Please specify" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem' }} />
                  )}

                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>What regions would you consider for ownership or involvement? (Select all that apply)</label>
                  <div>
                    <label><input type="checkbox" name="preferredRegions" value="anz" onChange={handleChange} checked={formData.preferredRegions.includes('anz')} /> Australia/New Zealand (ANZ)</label><br />
                    <label><input type="checkbox" name="preferredRegions" value="asia" onChange={handleChange} checked={formData.preferredRegions.includes('asia')} /> Asia (incl. Japan/China/SE Asia)</label><br />
                    <label><input type="checkbox" name="preferredRegions" value="northAmerica" onChange={handleChange} checked={formData.preferredRegions.includes('northAmerica')} /> North America (USA/Canada)</label><br />
                    <label><input type="checkbox" name="preferredRegions" value="centralSouthAmerica" onChange={handleChange} checked={formData.preferredRegions.includes('centralSouthAmerica')} /> Central & South America (incl. Mexico/Brazil/Argentina)</label><br />
                    <label><input type="checkbox" name="preferredRegions" value="middleEast" onChange={handleChange} checked={formData.preferredRegions.includes('middleEast')} /> Middle East (incl. UAE/Saudi)</label><br />
                    <label><input type="checkbox" name="preferredRegions" value="europe" onChange={handleChange} checked={formData.preferredRegions.includes('europe')} /> Europe (incl. UK/France/Germany)</label><br />
                    <label><input type="checkbox" name="preferredRegions" value="africa" onChange={handleChange} checked={formData.preferredRegions.includes('africa')} /> Africa</label><br />
                    <label><input type="checkbox" name="preferredRegions" value="other" onChange={handleChange} checked={formData.preferredRegions.includes('other')} /> Other (details: <input type="text" name="preferredRegionsOther" onChange={handleChange} style={{ marginLeft: '0.5rem' }} />)</label>
                  </div>
                </div>
              )}

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                {currentStep > 1 && <button type="button" onClick={handlePrev} style={{ padding: '0.5rem 1rem', background: '#ccc', color: '#fff', border: 'none', borderRadius: '4px', marginRight: '1rem', cursor: 'pointer' }}>Previous</button>}
                {currentStep < totalSteps && <button type="button" onClick={handleNext} style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Next</button>}
                {currentStep === totalSteps && <button type="submit" style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>}
              </div>
            </form>
            <button type="button" onClick={handleSkip} style={{ display: 'block', margin: '1rem auto 0', padding: '0.5rem 1rem', background: '#f0f0f0', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Skip for Now</button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2>Profile Summary</h2>
            {/* Example summary; in real use, load from localStorage and display key-value pairs */}
            <p>Owned Before: {formData.ownedBefore || 'Not specified'}</p>
            {/* Add more as needed */}
            <button type="button" onClick={() => setShowForm(true)} style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit Profile</button>
          </div>
        )}
      </section>
    </div>
  );
}
