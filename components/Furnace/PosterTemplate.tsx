"use client";

import React from 'react';

interface PosterTemplateProps {
  healingText: string;
  soulKeyword: string;
}

export const PosterTemplate = React.forwardRef<HTMLDivElement, PosterTemplateProps>(
  ({ healingText, soulKeyword }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: 'relative',
          width: '600px',
          height: '900px',
          backgroundColor: '#FDFBF7',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '48px',
          fontFamily: '"Songti SC", "SimSun", "STSong", serif',
        }}
      >
        {/* Background Base */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #FDFBF7 0%, #F5E6CA 100%)',
          }}
        />

        {/* Decorative Watermark */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            border: '40px solid rgba(184, 134, 11, 0.05)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-50px',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(184, 134, 11, 0.05) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Elegant Frame Border (Double Line) */}
        <div
          style={{
            position: 'absolute',
            inset: '20px',
            border: '1px solid rgba(184, 134, 11, 0.3)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '28px',
            border: '1px solid rgba(184, 134, 11, 0.1)',
            pointerEvents: 'none',
          }}
        />

        {/* Content Container */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            flex: 1,
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            paddingLeft: '32px',
            paddingRight: '16px',
            paddingTop: '32px',
            paddingBottom: '32px',
          }}
        >
          {/* RIGHT SIDE: Vertical Text Area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'flex-start',
              gap: '48px',
              height: '100%',
              paddingTop: '48px',
            }}
          >
            {/* Header Stamp */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                marginLeft: '16px',
                opacity: 0.7,
              }}
            >
              <div
                style={{
                  writingMode: 'vertical-rl',
                  fontSize: '10px',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#8B7355',
                }}
              >
                Furnace Rebirth
              </div>
              <div
                style={{
                  width: '1px',
                  height: '64px',
                  backgroundColor: 'rgba(184, 134, 11, 0.4)',
                }}
              />
              {/* Stamp - 移除所有阴影效果 */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  border: '2px solid #D7342F',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  transform: 'rotate(0deg)',
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    color: '#D7342F',
                    fontWeight: 'bold',
                    fontFamily: 'serif',
                  }}
                >
                  丙午
                </span>
              </div>
            </div>

            {/* Main Healing Text - Vertical */}
            <div
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
                fontSize: '32px',
                color: '#2C1810',
                fontWeight: 500,
                lineHeight: 2.5,
                letterSpacing: '0.1em',
                height: '650px',
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'flex-start',
                gap: '32px',
                fontFamily: '"Songti SC", "SimSun", "STSong", serif',
              }}
            >
              <p style={{ margin: 0 }}>{healingText}</p>
            </div>
          </div>

          {/* LEFT SIDE: Info & Keyword */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              paddingBottom: '32px',
              paddingLeft: '16px',
            }}
          >
            {/* 2026 Highlight */}
            <div style={{ position: 'relative', marginBottom: '48px' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '-24px',
                  top: 0,
                  bottom: 0,
                  width: '1px',
                  background: 'linear-gradient(to bottom, #B8860B, transparent)',
                }}
              />
              <div
                style={{
                  fontSize: '12px',
                  color: '#8B7355',
                  letterSpacing: '0.3em',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}
              >
                Soul Keyword
              </div>
              <div
                style={{
                  fontSize: '96px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(to bottom, #B8860B, #8B4513)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: '"Songti SC", "SimSun", "STSong", serif',
                }}
              >
                {soulKeyword}
              </div>
            </div>

            {/* Footer Seal */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                opacity: 0.6,
              }}
            >
              <div
                style={{
                  border: '1px solid #B8860B',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                }}
              >
                <span
                  style={{
                    fontSize: '10px',
                    color: '#B8860B',
                    fontFamily: 'serif',
                  }}
                >
                  Trae
                </span>
              </div>
              <div
                style={{
                  height: '1px',
                  width: '48px',
                  backgroundColor: 'rgba(184, 134, 11, 0.4)',
                }}
              />
              <span
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  color: '#8B7355',
                }}
              >
                CHANSHA
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PosterTemplate.displayName = 'PosterTemplate';

