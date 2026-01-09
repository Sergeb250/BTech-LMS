import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CertificateProps {
  studentName: string;
  completionDate: string;
  locked?: boolean;
}

export const Certificate: React.FC<CertificateProps> = ({ studentName, completionDate, locked = false }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    // exact URLs from user request
    const imageUrls = [
      "https://i.postimg.cc/zXtGS9R4/cisco-logo.jpg",
      "https://i.postimg.cc/yxM0kwjY/Gemini-Generated-Image-h2a51fh2a51fh2a5.png",
      "https://i.postimg.cc/15C3cLq9/Coat-of-arms-of-Rwanda.jpg",
      "https://i.postimg.cc/qRmtC9Jq/signature.png"
    ];

    const loadImages = async () => {
      const promises = imageUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = url;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(true); // Resolve even on error
        });
      });

      await Promise.all(promises);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  const downloadPDF = async () => {
    // Prevent download if locked
    if (!certificateRef.current || locked) return;
    setIsDownloading(true);

    try {
      await document.fonts.ready;

      // 1. Create a temporary container for the capture
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.width = '1123px'; // A4 Landscape px at 96dpi
      container.style.height = '794px';
      container.style.zIndex = '-1';
      document.body.appendChild(container);

      // 2. Clone the certificate node
      const clone = certificateRef.current.cloneNode(true) as HTMLElement;

      // 3. Reset all styles on the clone to ensure perfect A4 dimensions
      clone.style.transform = 'none';
      clone.style.margin = '0';
      clone.style.boxShadow = 'none';
      clone.style.width = '100%';
      clone.style.height = '100%';
      clone.style.background = 'linear-gradient(160deg, #0b2c4d 0%, #0a1f33 60%, #08192a 100%)';
      clone.style.borderRadius = '0';

      // 4. Force styles on text to prevent jumbling/overlapping
      const textElements = clone.querySelectorAll('h1, div, p, span, small');
      textElements.forEach((el) => {
        // Reset potentially problematic text styles for the capture
        (el as HTMLElement).style.letterSpacing = 'normal';
        (el as HTMLElement).style.fontVariant = 'normal';
        (el as HTMLElement).style.textShadow = 'none'; // text-shadow sometimes causes duplication in canvas
      });

      container.appendChild(clone);

      // 5. Short wait to ensure DOM settles
      await new Promise(resolve => setTimeout(resolve, 300));

      // 6. Capture the clean container (Scale 2 is sufficient for print)
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0b2c4d',
        width: 1123,
        height: 794
      });

      // 7. Cleanup
      document.body.removeChild(container);

      // 8. Generate PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
      pdf.save('CCNA_Certificate.pdf');

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to download certificate. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@300;400;500&display=swap');

        /* Wrapper for responsive preview scaling */
        .certificate-preview-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow: hidden;
          padding: 20px 0;
          perspective: 1000px;
        }

        .certificate-scaler {
           transform-origin: top center;
           transition: transform 0.3s ease;
           margin-bottom: -100px;
        }

        /* Responsive Scaling Breakpoints */
        .certificate-scaler { transform: scale(0.65); margin-bottom: -220px; }
        @media (min-width: 1600px) { .certificate-scaler { transform: scale(0.75); margin-bottom: -180px; } }
        @media (max-width: 1400px) { .certificate-scaler { transform: scale(0.55); margin-bottom: -320px; } }
        @media (max-width: 1000px) { .certificate-scaler { transform: scale(0.42); margin-bottom: -400px; } }
        @media (max-width: 650px) { .certificate-scaler { transform: scale(0.28); margin-bottom: -520px; } }

        /* User Provided Certificate CSS */
        .certificate {
          position: relative;
          width: 297mm; /* Force A4 size for the element */
          height: 210mm;
          background: linear-gradient(160deg, #0b2c4d 0%, #0a1f33 60%, #08192a 100%);
          border: 8px solid #ffffff;
          box-shadow: inset 0 0 0 6px #0b2c4d; /* Creates the double border effect */
          padding: 48px 60px;
          box-sizing: border-box;
          color: #eaf2f8;
          font-family: "Inter", sans-serif;
          margin: 0 auto;
        }

        /* Inner engraved line */
        .certificate::before {
          content: "";
          position: absolute;
          inset: 20px;
          border: 1.2px solid rgba(255,255,255,0.55);
          pointer-events: none;
        }

        /* Header Logos */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header img {
          height: 65px;
          object-fit: contain;
        }

        /* Title */
        .title {
          text-align: center;
          margin-top: 42px;
        }

        .title h1 {
          font-family: "Libre Baskerville", serif;
          font-size: 34px;
          letter-spacing: 1px;
          margin: 0;
          color: #fff;
        }

        .subtitle {
          margin-top: 8px;
          font-size: 14px;
          letter-spacing: 3px;
          opacity: 0.85;
          text-transform: uppercase;
        }

        /* Name */
        .student-name {
          margin-top: 46px;
          text-align: center;
          font-family: "Libre Baskerville", serif;
          font-size: 30px;
          font-weight: 700;
          color: #fff;
        }

        /* Content */
        .content {
          margin-top: 28px;
          text-align: center;
          max-width: 760px;
          margin-left: auto;
          margin-right: auto;
        }

        .content p {
          font-size: 15.5px;
          line-height: 1.9;
          opacity: 0.95;
          color: #eaf2f8;
        }

        /* Footer */
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 64px;
        }

        /* Signature */
        .signature img {
          height: 65px;
          margin-bottom: -8px;
        }

        .signature-line {
          width: 260px;
          border-top: 1.5px solid #ffffff;
          margin-top: 4px;
        }

        .signature small {
          display: block;
          margin-top: 8px;
          font-size: 12px;
          line-height: 1.4;
          color: #eaf2f8;
        }

        /* Meta */
        .meta {
          font-size: 12px;
          text-align: right;
          line-height: 1.6;
          color: #eaf2f8;
        }

        /* Certificate ID */
        .certificate-id {
          position: absolute;
          bottom: 20px;
          right: 36px;
          font-size: 11px;
          letter-spacing: 0.6px;
          opacity: 0.75;
        }
      `}</style>

      {!imagesLoaded ? (
        <div className="flex flex-col items-center justify-center p-12 h-[300px]">
          <Loader2 className="h-10 w-10 animate-spin text-[#0b2c4d] mb-4" />
          <p className="text-gray-600 font-medium">Preparing certificate...</p>
        </div>
      ) : (
        <>
          <div className="certificate-preview-wrapper max-h-[80vh] overflow-y-auto relative">
            {/* Lock Overlay */}
            {locked && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg">
                <div className="bg-background/90 p-6 rounded-full mb-4 shadow-2xl animate-bounce">
                  <Lock className="w-12 h-12 text-primary" />
                </div>
                <div className="bg-background/90 px-6 py-3 rounded-lg shadow-xl text-center">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Certificate Locked</h3>
                  <p className="text-muted-foreground text-sm mt-1">Complete all previous lessons to unlock</p>
                </div>
              </div>
            )}

            <div className={cn("certificate-scaler", locked && "blur-[2px] grayscale")}>
              <div ref={certificateRef} className="certificate">
                {/* Logos */}
                <div className="header">
                  {/* Note: CrossOrigin strictly needed for html2canvas */}
                  <img
                    src="https://i.postimg.cc/zXtGS9R4/cisco-logo.jpg"
                    alt="Cisco Logo"
                    crossOrigin="anonymous"
                    style={{ height: '60px', background: 'white', padding: '4px', borderRadius: '4px' }}
                  />
                  <img
                    src="https://i.postimg.cc/yxM0kwjY/Gemini-Generated-Image-h2a51fh2a51fh2a5.png"
                    alt="B Technologies Africa Logo"
                    crossOrigin="anonymous"
                    style={{ height: '80px', background: 'white', padding: '4px', borderRadius: '50%' }}
                  />
                  <img
                    src="https://i.postimg.cc/15C3cLq9/Coat-of-arms-of-Rwanda.jpg"
                    alt="MINICT Logo"
                    crossOrigin="anonymous"
                    style={{ height: '60px', background: 'white', padding: '4px', borderRadius: '4px' }}
                  />
                </div>

                {/* Title */}
                <div className="title">
                  <h1>Certificate of Completion</h1>
                  <div className="subtitle">CCNA NETWORKING TRAINING</div>
                </div>

                {/* Name */}
                <div className="student-name">
                  {studentName}
                </div>

                {/* Content */}
                <div className="content">
                  <p>
                    This certificate is awarded in recognition of the successful completion of a
                    professional Cisco Certified Network Associate (CCNA) networking training program
                    delivered by <strong>B Technologies Africa Ltd</strong>.
                    The training provided structured theoretical knowledge and hands-on practical
                    experience in network fundamentals, routing and switching, IP addressing,
                    VLANs, wireless networking, basic network security, and industry-aligned
                    troubleshooting practices.
                  </p>
                </div>

                {/* Footer */}
                <div className="footer">
                  <div className="signature">
                    <img src="https://i.postimg.cc/qRmtC9Jq/signature.png" alt="Signature" crossOrigin="anonymous" />
                    <div className="signature-line"></div>
                    <small>
                      Instructor: SERGE BENIT<br />
                      Trainer & Director<br />
                      B Technologies Africa Ltd
                    </small>
                  </div>

                  <div className="meta">
                    Kigali, Rwanda<br />
                    Date: {completionDate}
                  </div>
                </div>

                {/* Certificate ID */}
                <div className="certificate-id">
                  Certificate ID: BTA-CCNA-TR-2026-0001
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center gap-2 relative z-10 bg-background/80 p-4 rounded-lg">
            <Button
              onClick={downloadPDF}
              className="bg-[#0b2c4d] hover:bg-[#08223d] text-white font-semibold py-2 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
              disabled={isDownloading || locked}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating PDF...
                </>
              ) : locked ? (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Certificate Locked
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Download Certificate (PDF)
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
