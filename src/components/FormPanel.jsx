import { useState, useRef } from 'react';
import {
  User, Users, Star, GraduationCap, Phone,
  ChevronDown, Eye, EyeOff, Camera, X, Upload,
} from 'lucide-react';
import {
  FIELD_LABELS,
  GENDER_OPTIONS, COMPLEXION_OPTIONS, BLOOD_GROUP_OPTIONS,
  MARITAL_STATUS_OPTIONS, FAMILY_TYPE_OPTIONS, MANGLIK_OPTIONS,
} from '../data/constants';
import { validateImageFile, sanitizeInput } from '../utils/security';
import toast from 'react-hot-toast';

/* ─── Accordion Section Wrapper ─── */
function AccordionSection({ icon: Icon, title, subtitle, color, isOpen, onToggle, children }) {
  return (
    <div className={`glass-panel rounded-2xl transition-all duration-300 overflow-hidden ${
      isOpen ? 'ring-1 ring-slate-300/80 shadow-md' : 'hover:border-slate-300'
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3.5 px-4 sm:px-5 py-3.5 sm:py-4 text-left cursor-pointer hover:bg-slate-50/70 transition-colors"
      >
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-sm ${color}`}>
          <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">{title}</h3>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">{subtitle}</p>
        </div>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-slate-100 text-slate-500 transition-all duration-300 ${
          isOpen ? 'rotate-180 bg-slate-900 text-white shadow-xs' : 'hover:bg-slate-200'
        }`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        <div>
          <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Field Row with Visibility Toggle ─── */
function FieldRow({ field, label, children, visibility, toggleVisibility }) {
  const isVisible = visibility[field];
  return (
    <div className={`relative group transition-opacity duration-200 ${!isVisible ? 'opacity-40' : ''}`}>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
          {label || FIELD_LABELS[field]}
        </label>
        <button
          onClick={() => toggleVisibility(field)}
          className={`px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] font-semibold transition-colors cursor-pointer ${
            isVisible ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100' : 'text-slate-400 bg-slate-100 hover:bg-slate-200'
          }`}
          title={isVisible ? 'Visible in bio-data (Click to hide)' : 'Hidden (Click to show)'}
        >
          {isVisible ? (
            <>
              <Eye className="w-3 h-3 text-emerald-600" />
              <span className="text-[10px]">Show</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3 h-3" />
              <span className="text-[10px]">Hidden</span>
            </>
          )}
        </button>
      </div>
      {children}
    </div>
  );
}

/* ─── Input Component (Sanitized) ─── */
function Input({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(sanitizeInput(e.target.value))}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 text-base sm:text-sm text-slate-800 bg-slate-50/90 border border-slate-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 focus:bg-white transition-all placeholder:text-slate-300 shadow-2xs"
    />
  );
}

/* ─── Select Component (Sanitized) ─── */
function Select({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={e => onChange(sanitizeInput(e.target.value))}
      className="w-full px-3.5 py-2.5 text-base sm:text-sm text-slate-800 bg-slate-50/90 border border-slate-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 focus:bg-white transition-all appearance-none cursor-pointer shadow-2xs"
    >
      <option value="">{placeholder || 'Select...'}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

/* ─── Photo Uploader with Binary Signature & Security Checks ─── */
function PhotoUploader({ photo, onPhotoChange }) {
  const fileRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so user can re-upload if needed
    e.target.value = '';

    // Validate file size, MIME type, and binary magic-bytes
    const validation = await validateImageFile(file);
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid photo format');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      onPhotoChange(ev.target.result);
      toast.success('Photo uploaded securely!');
    };
    reader.onerror = () => {
      toast.error('Failed to read image file safely.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-4 p-3 bg-slate-50/70 border border-slate-200/70 rounded-2xl">
      <div className="relative group">
        <div
          className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-white shadow-xs cursor-pointer hover:border-slate-800 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          {photo ? (
            <img src={photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-1 text-slate-400">
              <Camera className="w-6 h-6 text-slate-300" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Photo</span>
            </div>
          )}
        </div>
        {photo && (
          <button
            onClick={() => {
              onPhotoChange(null);
              toast('Profile photo removed', { icon: '🗑️' });
            }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-rose-700 transition-colors"
            title="Remove Photo"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex-1">
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-2xs hover:shadow-sm cursor-pointer active:scale-95"
        >
          <Upload className="w-3.5 h-3.5 text-slate-500" />
          {photo ? 'Change Photo' : 'Upload Profile Photo'}
        </button>
        <p className="text-[11px] text-slate-400 mt-1.5 font-medium">JPG, PNG, WebP supported. Max 5MB</p>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}

/* ─── Main FormPanel ─── */
export default function FormPanel({ formData, updateField, visibility, toggleVisibility }) {
  const [openSections, setOpenSections] = useState({ personal: true });

  const toggle = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="lg:sticky lg:top-[70px] lg:max-h-[calc(100vh-90px)] lg:overflow-y-auto space-y-3 pt-2 lg:pt-4 pb-20 lg:pb-4 pr-0 lg:pr-1">
      {/* ── 1. Personal Information ── */}
      <AccordionSection
        icon={User}
        title="Personal Information"
        subtitle="Basic details & profile photo"
        color="bg-gradient-to-br from-blue-500 to-blue-600"
        isOpen={openSections.personal}
        onToggle={() => toggle('personal')}
      >
        <FieldRow field="profilePhoto" label="Profile Photo" visibility={visibility} toggleVisibility={toggleVisibility}>
          <PhotoUploader photo={formData.profilePhoto} onPhotoChange={v => updateField('profilePhoto', v)} />
        </FieldRow>

        <FieldRow field="fullName" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.fullName} onChange={v => updateField('fullName', v)} placeholder="e.g. Aarav Sharma" />
        </FieldRow>

        <div className="grid grid-cols-2 gap-3">
          <FieldRow field="gender" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Select value={formData.gender} onChange={v => updateField('gender', v)} options={GENDER_OPTIONS} placeholder="Gender" />
          </FieldRow>
          <FieldRow field="dateOfBirth" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input type="date" value={formData.dateOfBirth} onChange={v => updateField('dateOfBirth', v)} />
          </FieldRow>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FieldRow field="timeOfBirth" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input type="time" value={formData.timeOfBirth} onChange={v => updateField('timeOfBirth', v)} />
          </FieldRow>
          <FieldRow field="placeOfBirth" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.placeOfBirth} onChange={v => updateField('placeOfBirth', v)} placeholder="City, State" />
          </FieldRow>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FieldRow field="height" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.height} onChange={v => updateField('height', v)} placeholder={`e.g. 5'10"`} />
          </FieldRow>
          <FieldRow field="complexion" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Select value={formData.complexion} onChange={v => updateField('complexion', v)} options={COMPLEXION_OPTIONS} placeholder="Complexion" />
          </FieldRow>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FieldRow field="bloodGroup" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Select value={formData.bloodGroup} onChange={v => updateField('bloodGroup', v)} options={BLOOD_GROUP_OPTIONS} placeholder="Blood Group" />
          </FieldRow>
          <FieldRow field="motherTongue" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.motherTongue} onChange={v => updateField('motherTongue', v)} placeholder="e.g. Hindi" />
          </FieldRow>
        </div>

        <FieldRow field="maritalStatus" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Select value={formData.maritalStatus} onChange={v => updateField('maritalStatus', v)} options={MARITAL_STATUS_OPTIONS} placeholder="Marital Status" />
        </FieldRow>

        <div className="grid grid-cols-3 gap-2.5">
          <FieldRow field="religion" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.religion} onChange={v => updateField('religion', v)} placeholder="Religion (e.g. Hindu)" />
          </FieldRow>
          <FieldRow field="caste" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.caste} onChange={v => updateField('caste', v)} placeholder="Caste (e.g. Rajput)" />
          </FieldRow>
          <FieldRow field="subCaste" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.subCaste} onChange={v => updateField('subCaste', v)} placeholder="Sub Caste (e.g. Gaur)" />
          </FieldRow>
        </div>
      </AccordionSection>

      {/* ── 2. Family Background ── */}
      <AccordionSection
        icon={Users}
        title="Family Background"
        subtitle="Parents, siblings & family details"
        color="bg-gradient-to-br from-emerald-500 to-emerald-600"
        isOpen={openSections.family}
        onToggle={() => toggle('family')}
      >
        <FieldRow field="fatherName" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.fatherName} onChange={v => updateField('fatherName', v)} placeholder="Father's full name" />
        </FieldRow>
        <FieldRow field="fatherOccupation" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.fatherOccupation} onChange={v => updateField('fatherOccupation', v)} placeholder="Occupation" />
        </FieldRow>
        <FieldRow field="motherName" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.motherName} onChange={v => updateField('motherName', v)} placeholder="Mother's full name" />
        </FieldRow>
        <FieldRow field="motherOccupation" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.motherOccupation} onChange={v => updateField('motherOccupation', v)} placeholder="Occupation" />
        </FieldRow>
        <div className="grid grid-cols-2 gap-3">
          <FieldRow field="brothers" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.brothers} onChange={v => updateField('brothers', v)} placeholder="e.g. 1 (Married)" />
          </FieldRow>
          <FieldRow field="sisters" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.sisters} onChange={v => updateField('sisters', v)} placeholder="e.g. 1 (Unmarried)" />
          </FieldRow>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FieldRow field="familyType" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Select value={formData.familyType} onChange={v => updateField('familyType', v)} options={FAMILY_TYPE_OPTIONS} placeholder="Family Type" />
          </FieldRow>
          <FieldRow field="familyValues" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.familyValues} onChange={v => updateField('familyValues', v)} placeholder="e.g. Traditional" />
          </FieldRow>
        </div>
        <FieldRow field="nativePlace" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.nativePlace} onChange={v => updateField('nativePlace', v)} placeholder="Hometown" />
        </FieldRow>
      </AccordionSection>

      {/* ── 3. Horoscope / Astrological Details ── */}
      <AccordionSection
        icon={Star}
        title="Horoscope Details"
        subtitle="Astrological information (optional)"
        color="bg-gradient-to-br from-amber-500 to-orange-500"
        isOpen={openSections.horoscope}
        onToggle={() => toggle('horoscope')}
      >
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-medium text-slate-500">Show Horoscope Section</span>
          <button
            onClick={() => toggleVisibility('sectionHoroscope')}
            className={`relative w-10 h-5.5 rounded-full transition-colors duration-200 cursor-pointer ${visibility.sectionHoroscope ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            <span className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${visibility.sectionHoroscope ? 'left-5' : 'left-0.5'}`} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FieldRow field="rashi" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.rashi} onChange={v => updateField('rashi', v)} placeholder="e.g. Vrishabha" />
          </FieldRow>
          <FieldRow field="nakshatra" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.nakshatra} onChange={v => updateField('nakshatra', v)} placeholder="e.g. Rohini" />
          </FieldRow>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FieldRow field="gotra" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.gotra} onChange={v => updateField('gotra', v)} placeholder="e.g. Bharadwaj" />
          </FieldRow>
          <FieldRow field="manglikStatus" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Select value={formData.manglikStatus} onChange={v => updateField('manglikStatus', v)} options={MANGLIK_OPTIONS} placeholder="Manglik" />
          </FieldRow>
        </div>
      </AccordionSection>

      {/* ── 4. Education & Career ── */}
      <AccordionSection
        icon={GraduationCap}
        title="Education & Career"
        subtitle="Qualifications & professional details"
        color="bg-gradient-to-br from-violet-500 to-purple-600"
        isOpen={openSections.education}
        onToggle={() => toggle('education')}
      >
        <FieldRow field="highestQualification" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.highestQualification} onChange={v => updateField('highestQualification', v)} placeholder="e.g. B.Tech in Computer Science" />
        </FieldRow>
        <FieldRow field="collegeUniversity" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.collegeUniversity} onChange={v => updateField('collegeUniversity', v)} placeholder="College / University name" />
        </FieldRow>
        <FieldRow field="additionalCertifications" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.additionalCertifications} onChange={v => updateField('additionalCertifications', v)} placeholder="e.g. AWS, PMP" />
        </FieldRow>
        <FieldRow field="currentOccupation" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.currentOccupation} onChange={v => updateField('currentOccupation', v)} placeholder="Job title / Designation" />
        </FieldRow>
        <FieldRow field="employer" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.employer} onChange={v => updateField('employer', v)} placeholder="Company name" />
        </FieldRow>
        <FieldRow field="annualIncome" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.annualIncome} onChange={v => updateField('annualIncome', v)} placeholder="e.g. ₹12,00,000" />
        </FieldRow>
      </AccordionSection>

      {/* ── 5. Contact Information ── */}
      <AccordionSection
        icon={Phone}
        title="Contact Information"
        subtitle="Phone, email & address"
        color="bg-gradient-to-br from-rose-500 to-pink-600"
        isOpen={openSections.contact}
        onToggle={() => toggle('contact')}
      >
        <FieldRow field="contactPerson" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.contactPerson} onChange={v => updateField('contactPerson', v)} placeholder="e.g. Father's Name (Relation)" />
        </FieldRow>
        <div className="grid grid-cols-2 gap-3">
          <FieldRow field="phoneNumber" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.phoneNumber} onChange={v => updateField('phoneNumber', v)} placeholder="+91 98765 43210" />
          </FieldRow>
          <FieldRow field="whatsappNumber" visibility={visibility} toggleVisibility={toggleVisibility}>
            <Input value={formData.whatsappNumber} onChange={v => updateField('whatsappNumber', v)} placeholder="+91 98765 43210" />
          </FieldRow>
        </div>
        <FieldRow field="email" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.email} onChange={v => updateField('email', v)} placeholder="email@example.com" />
        </FieldRow>
        <FieldRow field="residentialAddress" visibility={visibility} toggleVisibility={toggleVisibility}>
          <Input value={formData.residentialAddress} onChange={v => updateField('residentialAddress', v)} placeholder="Full residential address" />
        </FieldRow>
      </AccordionSection>
    </div>
  );
}
