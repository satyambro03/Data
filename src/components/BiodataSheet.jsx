import { forwardRef } from 'react';
import { FIELD_LABELS } from '../data/constants';

/* ─── Inline Editable Text ─── */
function EditableText({ value, field, updateField, inlineEditMode, style, className }) {
  if (!value && !inlineEditMode) return null;

  if (inlineEditMode) {
    return (
      <span
        contentEditable
        suppressContentEditableWarning
        className={`inline-editable ${className || ''}`}
        style={{ ...style, minWidth: '60px', display: 'inline-block' }}
        onBlur={e => updateField(field, e.target.textContent)}
      >
        {value || '—'}
      </span>
    );
  }

  return <span className={className} style={style}>{value}</span>;
}

/* ─── DataRow with Perfectly Aligned Colons (:) ─── */
function DataRow({ label, value, field, updateField, inlineEditMode, visible, colors, fonts, compact }) {
  if (!visible) return null;
  if (!value && !inlineEditMode) return null;

  const paddingY = compact ? '3.5px' : '4.5px';

  return (
    <tr style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
      <td
        style={{
          fontFamily: fonts.body,
          fontSize: compact ? '11px' : '12px',
          fontWeight: 600,
          color: colors.muted,
          padding: `${paddingY} 0`,
          verticalAlign: 'top',
          whiteSpace: 'nowrap',
          width: '155px',
        }}
      >
        {label}
      </td>
      <td
        style={{
          fontFamily: fonts.body,
          fontSize: compact ? '11px' : '12px',
          fontWeight: 700,
          color: colors.muted,
          padding: `${paddingY} 10px ${paddingY} 4px`,
          verticalAlign: 'top',
          width: '18px',
          textAlign: 'center',
        }}
      >
        :
      </td>
      <td
        style={{
          fontFamily: fonts.body,
          fontSize: compact ? '11.5px' : '12.5px',
          color: colors.text,
          padding: `${paddingY} 0`,
          verticalAlign: 'top',
          fontWeight: 500,
        }}
      >
        <EditableText
          value={value}
          field={field}
          updateField={updateField}
          inlineEditMode={inlineEditMode}
        />
      </td>
    </tr>
  );
}

/* ─── Lord Ganesha Vector Icon ─── */
function GaneshaIcon({ size = 48, color = '#c59b27' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ display: 'inline-block' }}>
      {/* Crown / Mukut */}
      <path d="M50 12 L56 22 L62 20 L58 30 L66 32 L50 44 L34 32 L42 30 L38 20 L44 22 Z" fill={color} />
      {/* Tilak / Trishul */}
      <path d="M50 25 L50 40 M46 30 Q50 35 54 30" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Head & Ear Right */}
      <path d="M55 42 Q75 42 78 56 Q80 70 66 70 Q60 70 56 66" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Head & Ear Left */}
      <path d="M45 42 Q25 42 22 56 Q20 70 34 70 Q40 70 44 66" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Trunk (Sond) curving right with Modak */}
      <path d="M48 46 Q53 62 48 76 Q45 84 56 86 Q64 86 64 78 Q64 72 58 72" stroke={color} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Tusk (Dant) */}
      <path d="M40 60 L33 62" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Eye / Tilak dot */}
      <circle cx="50" cy="30" r="2" fill="#d9531e" />
      <circle cx="60" cy="74" r="2.5" fill={color} />
    </svg>
  );
}

/* ─── Golden Filigree Corner (Image 1 Replica) ─── */
function GoldenFiligreeCorner({ position, rotate = 0, color = '#c59b27' }) {
  return (
    <div
      style={{
        position: 'absolute',
        ...position,
        width: '90px',
        height: '90px',
        pointerEvents: 'none',
        transform: `rotate(${rotate}deg)`,
        opacity: 0.95,
      }}
    >
      <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
        <path d="M6 6 L48 6 M6 6 L6 48" stroke={color} strokeWidth="2.5" />
        <path d="M12 12 L38 12 M12 12 L12 38" stroke={color} strokeWidth="1" />
        <path d="M10 10 Q28 12 36 28 Q44 44 28 36 Q12 28 10 10 Z" fill={color} opacity="0.9" />
        <path d="M6 48 Q16 45 22 58 Q24 68 16 65 Q10 61 6 48 Z" fill={color} opacity="0.8" />
        <path d="M48 6 Q45 16 58 22 Q68 24 65 16 Q61 10 48 6 Z" fill={color} opacity="0.8" />
        <circle cx="20" cy="20" r="3" fill={color} />
        <circle cx="28" cy="28" r="2" fill={color} />
        <circle cx="52" cy="10" r="2" fill={color} />
        <circle cx="10" cy="52" r="2" fill={color} />
      </svg>
    </div>
  );
}

/* ─── Vintage Heritage Corner Foliage (Image 3 Replica) ─── */
function HeritageFoliageCorner({ position, rotate = 0, color = '#85512b' }) {
  return (
    <div
      style={{
        position: 'absolute',
        ...position,
        width: '80px',
        height: '80px',
        pointerEvents: 'none',
        transform: `rotate(${rotate}deg)`,
        opacity: 0.9,
      }}
    >
      <svg viewBox="0 0 100 100" fill="none" width="100%" height="100%">
        <path d="M8 8 L40 8 M8 8 L8 40" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M14 14 Q32 16 38 32 Q44 46 30 38 Q16 30 14 14 Z" fill={color} opacity="0.8" />
        <circle cx="24" cy="24" r="3" fill={color} />
        <path d="M38 14 Q52 18 56 28 Q50 34 38 24 Z" fill={color} opacity="0.75" />
        <path d="M14 38 Q18 52 28 56 Q34 50 24 38 Z" fill={color} opacity="0.75" />
      </svg>
    </div>
  );
}

/* ─── Palace Jharokha Arch & Toran Header (Image 2 Replica) ─── */
function PalaceArchHeader({ colors }) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '140px', pointerEvents: 'none', zIndex: 1 }}>
      <svg viewBox="0 0 794 140" width="100%" height="140" preserveAspectRatio="none">
        {/* Scalloped Arch Outer line */}
        <path
          d="M 30 140 L 30 36 Q 120 36 160 22 Q 240 22 280 14 Q 350 14 397 4 Q 444 14 514 14 Q 554 22 634 22 Q 674 36 764 36 L 764 140"
          fill="none"
          stroke={colors.primary}
          strokeWidth="3.5"
        />
        {/* Scalloped Arch Inner gold line */}
        <path
          d="M 36 140 L 36 42 Q 124 42 163 28 Q 242 28 282 20 Q 351 20 397 10 Q 443 20 512 20 Q 552 28 631 28 Q 670 42 758 42 L 758 140"
          fill="none"
          stroke={colors.secondary}
          strokeWidth="1.5"
        />
        {/* Hanging Floral Torans (Left) */}
        <line x1="50" y1="0" x2="50" y2="58" stroke={colors.secondary} strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="50" cy="62" r="8" fill="#e91e63" opacity="0.8" />
        <circle cx="50" cy="62" r="3" fill="#ffffff" />
        <line x1="50" y1="70" x2="50" y2="88" stroke={colors.secondary} strokeWidth="1" strokeDasharray="2 2" />
        <path d="M47 88 L53 88 L50 96 Z" fill={colors.secondary} />

        {/* Hanging Floral Torans (Right) */}
        <line x1="744" y1="0" x2="744" y2="58" stroke={colors.secondary} strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="744" cy="62" r="8" fill="#e91e63" opacity="0.8" />
        <circle cx="744" cy="62" r="3" fill="#ffffff" />
        <line x1="744" y1="70" x2="744" y2="88" stroke={colors.secondary} strokeWidth="1" strokeDasharray="2 2" />
        <path d="M741 88 L747 88 L744 96 Z" fill={colors.secondary} />
      </svg>
    </div>
  );
}

/* ─── Section Header ─── */
function SectionHeader({ title, colors, fonts, templateId, compact }) {
  const pad = compact ? '4px 0' : '6px 0';
  const marginT = compact ? '12px' : '16px';
  const marginB = compact ? '4px' : '6px';

  // Specific styles for user reference templates
  if (templateId === 'golden_filigree') {
    return (
      <div style={{
        fontFamily: fonts.heading,
        fontSize: '15.5px',
        fontWeight: 700,
        color: colors.primary,
        marginTop: marginT,
        marginBottom: marginB,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}>
        {title}
      </div>
    );
  }

  if (templateId === 'palace_jharokha') {
    return (
      <div style={{
        fontFamily: fonts.heading,
        fontSize: '15px',
        fontWeight: 700,
        color: colors.primary,
        marginTop: marginT,
        marginBottom: marginB,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}>
        {title}
      </div>
    );
  }

  if (templateId === 'heritage_bronze') {
    return (
      <div style={{
        fontFamily: fonts.heading,
        fontSize: '12.5px',
        fontWeight: 700,
        color: colors.accent,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        marginTop: marginT,
        marginBottom: marginB,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}>
        {title}
      </div>
    );
  }

  // Fallback banner styles for other templates
  const styles = {
    royal: {
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}ee)`,
      color: colors.headerText,
      padding: '6px 14px',
      fontFamily: fonts.heading,
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '2px',
      textTransform: 'uppercase',
      borderRadius: '4px',
      marginBottom: marginB,
      marginTop: marginT,
      textAlign: 'center',
    },
    emerald: {
      background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
      color: colors.headerText,
      padding: '6px 14px',
      fontFamily: fonts.heading,
      fontSize: '12.5px',
      fontWeight: 700,
      letterSpacing: '2.5px',
      textTransform: 'uppercase',
      borderTop: `1px solid ${colors.secondary}`,
      borderBottom: `1px solid ${colors.secondary}`,
      marginBottom: marginB,
      marginTop: marginT,
      textAlign: 'center',
    },
    ruby: {
      background: `linear-gradient(135deg, ${colors.primary}, #590014)`,
      color: colors.headerText,
      padding: '6px 14px',
      fontFamily: fonts.heading,
      fontSize: '13px',
      fontWeight: 700,
      letterSpacing: '2px',
      borderRadius: '6px',
      marginBottom: marginB,
      marginTop: marginT,
      textAlign: 'center',
      border: `1px solid ${colors.secondary}80`,
    },
    peacock: {
      color: colors.headerText,
      background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
      padding: '6px 14px',
      fontFamily: fonts.heading,
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '2px',
      textTransform: 'uppercase',
      borderRadius: '4px',
      marginBottom: marginB,
      marginTop: marginT,
    },
    elegant: {
      color: colors.secondary,
      fontFamily: fonts.heading,
      fontSize: '13px',
      fontWeight: 600,
      letterSpacing: '3px',
      textTransform: 'uppercase',
      borderBottom: `1.5px solid ${colors.secondary}`,
      paddingBottom: '5px',
      marginBottom: marginB,
      marginTop: marginT,
    },
    modern: {
      color: colors.primary,
      fontFamily: fonts.heading,
      fontSize: '11.5px',
      fontWeight: 700,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      borderLeft: `3.5px solid ${colors.secondary}`,
      paddingLeft: '10px',
      marginBottom: marginB,
      marginTop: marginT,
      background: `${colors.secondary}12`,
      paddingTop: '4px',
      paddingBottom: '4px',
      borderRadius: '0 4px 4px 0',
    },
    floral: {
      color: colors.primary,
      fontFamily: fonts.heading,
      fontSize: '13px',
      fontWeight: 600,
      fontStyle: 'italic',
      letterSpacing: '1px',
      borderBottom: `1.5px solid ${colors.border}`,
      paddingBottom: '5px',
      marginBottom: marginB,
      marginTop: marginT,
      textAlign: 'center',
    },
    lavender: {
      background: `linear-gradient(135deg, ${colors.primary}18, ${colors.secondary}22)`,
      color: colors.primary,
      borderLeft: `4px solid ${colors.primary}`,
      padding: '5px 10px',
      fontFamily: fonts.heading,
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      borderRadius: '0 6px 6px 0',
      marginBottom: marginB,
      marginTop: marginT,
    },
    ivory: {
      color: colors.primary,
      fontFamily: fonts.heading,
      fontSize: '13px',
      fontWeight: 600,
      letterSpacing: '3px',
      textTransform: 'uppercase',
      textAlign: 'center',
      borderTop: `1px solid ${colors.secondary}`,
      borderBottom: `1px solid ${colors.secondary}`,
      paddingTop: '5px',
      paddingBottom: '5px',
      marginBottom: marginB,
      marginTop: marginT,
    },
    saffron: {
      background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
      color: colors.headerText,
      padding: '6px 14px',
      fontFamily: fonts.heading,
      fontSize: '12.5px',
      fontWeight: 700,
      letterSpacing: '2px',
      borderRadius: '4px',
      marginBottom: marginB,
      marginTop: marginT,
      textAlign: 'center',
      borderBottom: `2px solid ${colors.accent}`,
    },
  };

  return <div style={{ ...styles[templateId], pageBreakInside: 'avoid', breakInside: 'avoid' }}>{title}</div>;
}

/* ─── Format date & time ─── */
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr) {
  if (!timeStr) return '';
  try {
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return `${h12 < 10 ? '0' + h12 : h12}:${m} ${ampm}`;
  } catch {
    return timeStr;
  }
}

/* ─── MAIN BIODATA SHEET COMPONENT ─── */
const BiodataSheet = forwardRef(function BiodataSheet(
  { formData, updateField, visibility, template, inlineEditMode, selectedFont, compactMode = false },
  ref
) {
  const colors = template.colors;
  const fonts = {
    heading: selectedFont?.heading || template.fonts.heading,
    body: selectedFont?.body || template.fonts.body,
  };
  const templateId = template.id;

  const vis = (field) => visibility[field];
  const val = (field) => formData[field];

  const hasPersonalData = ['fullName','gender','dateOfBirth','timeOfBirth','placeOfBirth','height','complexion','bloodGroup','motherTongue','maritalStatus','religion','caste','subCaste']
    .some(f => vis(f) && val(f));
  const hasFamilyData = ['fatherName','fatherOccupation','motherName','motherOccupation','brothers','sisters','familyType','familyValues','nativePlace']
    .some(f => vis(f) && val(f));
  const hasHoroscopeData = visibility.sectionHoroscope && ['rashi','nakshatra','gotra','manglikStatus'].some(f => vis(f) && val(f));
  const hasEducationData = ['highestQualification','collegeUniversity','additionalCertifications','currentOccupation','employer','annualIncome']
    .some(f => vis(f) && val(f));
  const hasContactData = ['contactPerson','phoneNumber','whatsappNumber','email','residentialAddress']
    .some(f => vis(f) && val(f));

  // Determine border styles
  const isGoldenFiligree = templateId === 'golden_filigree';
  const isPalaceJharokha = templateId === 'palace_jharokha';
  const isHeritageBronze = templateId === 'heritage_bronze';

  const sheetBorder = isGoldenFiligree
    ? `3px solid ${colors.secondary}`
    : isPalaceJharokha
    ? `3px solid ${colors.primary}`
    : isHeritageBronze
    ? `2px solid ${colors.primary}`
    : `2px solid ${colors.border}`;

  return (
    <div
      ref={ref}
      id="biodata-print-container"
      className="pdf-target bg-sheet"
      style={{
        width: '794px',
        minHeight: '1123px',
        backgroundColor: colors.bg,
        fontFamily: fonts.body,
        color: colors.text,
        position: 'relative',
        border: sheetBorder,
        boxSizing: 'border-box',
        overflow: 'visible',
      }}
    >
      {/* ── 1. Golden Filigree Template Decorative Corners (Image 1) ── */}
      {isGoldenFiligree && (
        <>
          {/* Inner gold frame */}
          <div
            style={{
              position: 'absolute',
              inset: '10px',
              border: `1.5px solid ${colors.secondary}`,
              pointerEvents: 'none',
              borderRadius: '2px',
            }}
          />
          <GoldenFiligreeCorner position={{ top: '14px', left: '14px' }} rotate={0} color={colors.secondary} />
          <GoldenFiligreeCorner position={{ top: '14px', right: '14px' }} rotate={90} color={colors.secondary} />
          <GoldenFiligreeCorner position={{ bottom: '14px', left: '14px' }} rotate={270} color={colors.secondary} />
          <GoldenFiligreeCorner position={{ bottom: '14px', right: '14px' }} rotate={180} color={colors.secondary} />
        </>
      )}

      {/* ── 2. Palace Jharokha Arch & Ganesha Watermark (Image 2) ── */}
      {isPalaceJharokha && (
        <>
          <PalaceArchHeader colors={colors} />
          {/* Center Ganesha Watermark */}
          <div
            style={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.07,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <GaneshaIcon size={340} color={colors.primary} />
          </div>
        </>
      )}

      {/* ── 3. Vintage Heritage Dotted Frame (Image 3) ── */}
      {isHeritageBronze && (
        <>
          <div
            style={{
              position: 'absolute',
              inset: '14px',
              border: `2px dotted ${colors.primary}`,
              pointerEvents: 'none',
              borderRadius: '3px',
            }}
          />
          <HeritageFoliageCorner position={{ top: '12px', left: '12px' }} rotate={0} color={colors.primary} />
          <HeritageFoliageCorner position={{ top: '12px', right: '12px' }} rotate={90} color={colors.primary} />
          <HeritageFoliageCorner position={{ bottom: '12px', left: '12px' }} rotate={270} color={colors.primary} />
          <HeritageFoliageCorner position={{ bottom: '12px', right: '12px' }} rotate={180} color={colors.primary} />
        </>
      )}

      {/* ── Content Container ── */}
      <div style={{
        padding: isGoldenFiligree ? '34px 44px' : isPalaceJharokha ? '26px 44px' : '36px 44px',
        position: 'relative',
        zIndex: 2,
      }}>

        {/* ── Top Header / Invocation ── */}
        <div style={{ textAlign: 'center', marginBottom: '8px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
          {/* Ganesha Emblem for Palace Jharokha or Heritage Bronze */}
          {(isPalaceJharokha || isHeritageBronze || templateId === 'ruby' || templateId === 'saffron') && (
            <div style={{ marginBottom: '2px' }}>
              <GaneshaIcon size={isPalaceJharokha ? 46 : 42} color={colors.secondary} />
              <div style={{
                fontFamily: fonts.heading,
                fontSize: '12px',
                color: isHeritageBronze ? colors.primary : colors.secondary,
                fontWeight: 700,
                letterSpacing: '3px',
                marginTop: '1px',
              }}>
                {isPalaceJharokha ? 'ॐ श्री गणेशाय नमः' : '॥ श्री गणेशाय नमः ॥'}
              </div>
            </div>
          )}

          {/* Golden Filigree Title (Centered BIODATA in clean bold serif - Image 1) */}
          {isGoldenFiligree && (
            <h1
              style={{
                fontFamily: fonts.heading,
                fontSize: '25px',
                fontWeight: 700,
                color: '#1a1a1a',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                margin: '0 auto 18px',
                textAlign: 'center',
              }}
            >
              BIODATA
            </h1>
          )}

          {/* Standard title for other templates */}
          {!isGoldenFiligree && (
            <h1
              style={{
                fontFamily: fonts.heading,
                fontSize: isPalaceJharokha ? '14px' : '22px',
                fontWeight: 700,
                color: colors.primary,
                letterSpacing: isPalaceJharokha ? '2px' : '3px',
                textTransform: 'uppercase',
                marginBottom: '2px',
              }}
            >
              {isPalaceJharokha ? 'BIO DATA' : 'BIODATA'}
            </h1>
          )}
        </div>

        {/* ── Name & Profile Photo Layout ── */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '24px',
          marginTop: isGoldenFiligree ? '6px' : isPalaceJharokha ? '12px' : '10px',
          marginBottom: '10px',
          pageBreakInside: 'avoid',
          breakInside: 'avoid',
        }}>
          {/* Name Header */}
          <div style={{ flex: 1 }}>
            {vis('fullName') && (
              <h2
                style={{
                  fontFamily: fonts.heading,
                  fontSize: isGoldenFiligree ? '26px' : isPalaceJharokha ? '24px' : '22px',
                  fontWeight: 700,
                  color: colors.primary,
                  lineHeight: 1.2,
                  marginBottom: '8px',
                }}
              >
                <EditableText
                  value={val('fullName')}
                  field="fullName"
                  updateField={updateField}
                  inlineEditMode={inlineEditMode}
                />
              </h2>
            )}
          </div>

          {/* Profile Photo: Right Aligned for Palace Jharokha (Circular) and Heritage Bronze (Rectangular) */}
          {vis('profilePhoto') && val('profilePhoto') && (
            <div style={{ flexShrink: 0 }}>
              {isPalaceJharokha ? (
                /* Circular Photo with Pearl Beaded Frame (Image 2) */
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    padding: '3px',
                    backgroundColor: '#ffffff',
                    border: `3px solid ${colors.secondary}`,
                    boxShadow: `0 0 0 2px ${colors.primary}, 0 6px 14px rgba(0,0,0,0.12)`,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={val('profilePhoto')}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  />
                </div>
              ) : isHeritageBronze ? (
                /* Rectangular Photo with Terracotta Double Frame (Image 3) */
                <div
                  style={{
                    width: '135px',
                    height: '165px',
                    padding: '3px',
                    backgroundColor: '#ffffff',
                    border: `2px solid ${colors.primary}`,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  <img
                    src={val('profilePhoto')}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                /* Standard framed photo */
                <div
                  style={{
                    width: '120px',
                    height: '145px',
                    borderRadius: '4px',
                    border: `2px solid ${colors.border}`,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={val('profilePhoto')}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── 1. Personal & Horoscope Details ── */}
        {(hasPersonalData || inlineEditMode) && (
          <div style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            {isHeritageBronze && (
              <SectionHeader title="Personal Details" colors={colors} fonts={fonts} templateId={templateId} compact={compactMode} />
            )}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <DataRow label={FIELD_LABELS.dateOfBirth} value={formatDate(val('dateOfBirth'))} field="dateOfBirth" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('dateOfBirth')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.timeOfBirth} value={formatTime(val('timeOfBirth'))} field="timeOfBirth" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('timeOfBirth')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.placeOfBirth} value={val('placeOfBirth')} field="placeOfBirth" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('placeOfBirth')} colors={colors} fonts={fonts} compact={compactMode} />
                
                {/* Horoscope fields in main flow if present */}
                {visibility.sectionHoroscope && (
                  <>
                    <DataRow label={FIELD_LABELS.rashi} value={val('rashi')} field="rashi" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('rashi')} colors={colors} fonts={fonts} compact={compactMode} />
                    <DataRow label={FIELD_LABELS.nakshatra} value={val('nakshatra')} field="nakshatra" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('nakshatra')} colors={colors} fonts={fonts} compact={compactMode} />
                  </>
                )}

                <DataRow label={FIELD_LABELS.height} value={val('height')} field="height" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('height')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.complexion} value={val('complexion')} field="complexion" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('complexion')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.bloodGroup} value={val('bloodGroup')} field="bloodGroup" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('bloodGroup')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.religion} value={val('religion')} field="religion" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('religion')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.caste} value={val('caste')} field="caste" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('caste')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.subCaste} value={val('subCaste')} field="subCaste" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('subCaste')} colors={colors} fonts={fonts} compact={compactMode} />
                
                {visibility.sectionHoroscope && (
                  <>
                    <DataRow label={FIELD_LABELS.gotra} value={val('gotra')} field="gotra" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('gotra')} colors={colors} fonts={fonts} compact={compactMode} />
                    <DataRow label={FIELD_LABELS.manglikStatus} value={val('manglikStatus')} field="manglikStatus" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('manglikStatus')} colors={colors} fonts={fonts} compact={compactMode} />
                  </>
                )}

                <DataRow label={FIELD_LABELS.maritalStatus} value={val('maritalStatus')} field="maritalStatus" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('maritalStatus')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.motherTongue} value={val('motherTongue')} field="motherTongue" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('motherTongue')} colors={colors} fonts={fonts} compact={compactMode} />
                
                {/* Education & Career in flow for Image 1 / Image 2 style */}
                <DataRow label={FIELD_LABELS.highestQualification} value={val('highestQualification')} field="highestQualification" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('highestQualification')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.collegeUniversity} value={val('collegeUniversity')} field="collegeUniversity" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('collegeUniversity')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.additionalCertifications} value={val('additionalCertifications')} field="additionalCertifications" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('additionalCertifications')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.currentOccupation} value={val('currentOccupation')} field="currentOccupation" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('currentOccupation')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.employer} value={val('employer')} field="employer" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('employer')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.annualIncome} value={val('annualIncome')} field="annualIncome" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('annualIncome')} colors={colors} fonts={fonts} compact={compactMode} />
              </tbody>
            </table>
          </div>
        )}

        {/* ── 2. Family Details ── */}
        {(hasFamilyData || inlineEditMode) && (
          <div style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            <SectionHeader title="Family Details" colors={colors} fonts={fonts} templateId={templateId} compact={compactMode} />
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <DataRow label={FIELD_LABELS.fatherName} value={val('fatherName')} field="fatherName" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('fatherName')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.fatherOccupation} value={val('fatherOccupation')} field="fatherOccupation" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('fatherOccupation')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.motherName} value={val('motherName')} field="motherName" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('motherName')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.motherOccupation} value={val('motherOccupation')} field="motherOccupation" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('motherOccupation')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.brothers} value={val('brothers')} field="brothers" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('brothers')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.sisters} value={val('sisters')} field="sisters" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('sisters')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.familyType} value={val('familyType')} field="familyType" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('familyType')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.familyValues} value={val('familyValues')} field="familyValues" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('familyValues')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.nativePlace} value={val('nativePlace')} field="nativePlace" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('nativePlace')} colors={colors} fonts={fonts} compact={compactMode} />
              </tbody>
            </table>
          </div>
        )}

        {/* ── 3. Contact Details ── */}
        {(hasContactData || inlineEditMode) && (
          <div style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            <SectionHeader title="Contact Details" colors={colors} fonts={fonts} templateId={templateId} compact={compactMode} />
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <DataRow label={FIELD_LABELS.contactPerson} value={val('contactPerson')} field="contactPerson" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('contactPerson')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.phoneNumber} value={val('phoneNumber')} field="phoneNumber" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('phoneNumber')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.whatsappNumber} value={val('whatsappNumber')} field="whatsappNumber" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('whatsappNumber')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.email} value={val('email')} field="email" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('email')} colors={colors} fonts={fonts} compact={compactMode} />
                <DataRow label={FIELD_LABELS.residentialAddress} value={val('residentialAddress')} field="residentialAddress" updateField={updateField} inlineEditMode={inlineEditMode} visible={vis('residentialAddress')} colors={colors} fonts={fonts} compact={compactMode} />
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {!hasPersonalData && !hasFamilyData && !hasEducationData && !hasContactData && !inlineEditMode && (
          <div style={{ textAlign: 'center', padding: '80px 40px', color: colors.muted, fontFamily: fonts.body }}>
            <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>📝</div>
            <p style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px' }}>Start filling in the form</p>
            <p style={{ fontSize: '12px', opacity: 0.7 }}>Your bio-data preview will appear here in real-time</p>
          </div>
        )}

        {/* Footer ornament for non-filigree styles */}
        {!isGoldenFiligree && !isPalaceJharokha && (
          <div style={{
            textAlign: 'center',
            marginTop: compactMode ? '16px' : '24px',
            paddingTop: '12px',
            borderTop: `1px solid ${colors.border}40`,
            pageBreakInside: 'avoid',
            breakInside: 'avoid',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <div style={{ width: '40px', height: '1px', background: `linear-gradient(to right, transparent, ${colors.secondary}60)` }} />
              <span style={{ color: colors.secondary, fontSize: '10px' }}>❖</span>
              <div style={{ width: '40px', height: '1px', background: `linear-gradient(to left, transparent, ${colors.secondary}60)` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default BiodataSheet;
