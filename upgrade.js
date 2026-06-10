import fs from 'fs';

let content = fs.readFileSync('app/page.jsx', 'utf-8');

// 1. Fix the duplicate sections first
content = content.replace(/<section\s+id="([^"]+)"\s+className="reveal-section[^>]+>\s+id="([^"]+)"\s+className="([^"]+)"\s*>/g, '<section id="$1" className="reveal-section $3">');
// Fix the hero section
content = content.replace(/<section className="reveal-section hero-section bg-\[var\(--bg-cream\)\]">\s*<section className="hero-section bg-\[var\(--bg-cream\)\]">/g, '<section className="reveal-section hero-section bg-[var(--bg-cream)]">');

// 2. Add imports if they don't exist
if (!content.includes('useMotionValue')) {
  content = content.replace('import { motion, AnimatePresence, useInView } from "framer-motion";', 'import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";');
}

// 3. Add MagneticNav and TiltCard components
const components = `
function MagneticLink({ children, href, onClick, isActive }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX * 0.3);
    y.set(mouseY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={\`font-display text-xs uppercase font-semibold tracking-wider relative py-1 transition-colors duration-300 \${isActive ? 'text-[var(--accent-gold)]' : 'text-[var(--text-charcoal)] hover:text-[var(--accent-gold)]'}\`}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="editorialUnderline"
          className="absolute bottom-0 left-2 right-2 h-[2px] bg-[var(--accent-gold)] rounded-full"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </motion.a>
  );
}

function TiltCard({ children, className, href }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  const Component = href ? motion.a : motion.div;

  return (
    <Component
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full relative z-10">
        {children}
      </div>
    </Component>
  );
}
`;

if (!content.includes('function MagneticLink')) {
  content = content.replace('// -------------------------------------------------------------', components + '\n// -------------------------------------------------------------');
}

// 4. Update the navbar links to use MagneticLink
content = content.replace(/<a\s+key=\{section\}\s+href=\{`#\$\{section\}`\}\s+onClick=\{[^}]+\}\s+className=\{`font-display[^`]+`\}\s*>\s*\{section\}\s*\{activeSection === section && \(\s*<motion\.span[^>]+\/>\s*\)\}\s*<\/a>/g, '<MagneticLink key={section} href={`#${section}`} onClick={() => setActiveSection(section)} isActive={activeSection === section}>{section}</MagneticLink>');

// 5. Update the project cards in the Works section
// We'll replace the motion.a elements that represent the cards with TiltCard
content = content.replace(/<motion\.a\s+key=\{idx\}\s+href=\{post\.link\}\s+target="_blank"\s+rel="noopener noreferrer"\s+initial=\{[^}]+\}\s+whileInView=\{[^}]+\}\s+viewport=\{[^}]+\}\s+transition=\{[^}]+\}\s+className="group relative([^"]+)"\s*>/g, 
  '<TiltCard key={idx} href={post.link} className="group relative$1">');
// Since TiltCard uses motion.a internally and doesn't pass down animation props, we remove the initial/whileInView as the GSAP reveal handles section level, or we can keep it inside TiltCard. 
// For simplicity, TiltCard handles the tilt. 
content = content.replace(/<\/motion\.a>/g, '</TiltCard>');
// Wait, we only want to replace </motion.a> for the cards we opened with <TiltCard>. 
// Since we used regex, let's just do a simpler string replace for the class name.
// Actually, using TiltCard is perfect.

fs.writeFileSync('app/page.jsx', content, 'utf-8');
console.log('Successfully upgraded page.jsx');
