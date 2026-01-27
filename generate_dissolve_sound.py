import wave
import random
import struct
import math

# Output file path
output_path = r"d:\trae_projects\情绪熔炉2\public\audio\dissolve.wav"

# Audio parameters
duration = 6.0  # Increased length for better fade
sample_rate = 44100
num_samples = int(duration * sample_rate)

# Generate cinematic dissolve sound
# 1. Initial "Boom" (Energy release)
# 2. Strong "Whoosh" (Pink noise + Low Pass)
# 3. Long "Hiss/Wind" tail (White noise + Band Pass) that fades out

data = []

print(f"Generating optimized dissolve sound to {output_path}...")

b = [0] * 7 # Pink noise buffer
lp_val = 0  # Low pass buffer

for i in range(num_samples):
    t = i / sample_rate
    progress = i / num_samples
    
    # --- 1. Noise Generator ---
    white = random.uniform(-1, 1)
    
    # Pink noise (Paul Kellet's method)
    b[0] = 0.99886 * b[0] + white * 0.0555179
    b[1] = 0.99332 * b[1] + white * 0.0750759
    b[2] = 0.96900 * b[2] + white * 0.1538520
    b[3] = 0.86650 * b[3] + white * 0.3104856
    b[4] = 0.55000 * b[4] + white * 0.5329522
    b[5] = -0.7616 * b[5] - white * 0.0168980
    pink = sum(b[:6]) + white * 0.5362
    b[6] = white * 0.115926
    
    # Combine Pink (body) and White (air)
    base_signal = pink * 0.7 + white * 0.3
    
    # --- 2. Envelope Shaping (Strong to Weak) ---
    if t < 0.1:
        # Fast Attack (Impact)
        amp = t / 0.1
    else:
        # Exponential Decay (Release)
        # Power of 4 decay for "Fast drop then lingering tail"
        decay_progress = (t - 0.1) / (duration - 0.1)
        amp = max(0, (1 - decay_progress) ** 4)
    
    # --- 3. Dynamic Low Pass Filter ---
    # Start open (bright/loud), close over time (muffled/distant)
    # Cutoff frequency moves from High -> Low
    cutoff = 0.8 * (1 - progress * 0.8) # 0.0 to 1.0 (relative to Nyquist)
    
    # Simple IIR Low Pass
    lp_val = lp_val + cutoff * (base_signal - lp_val)
    
    # --- 4. Sub-bass Impact (Initial Boom) ---
    boom = 0
    if t < 0.5:
        # 50Hz sine wave decaying fast
        boom_amp = 1.0 - (t / 0.5)
        boom = math.sin(2 * math.pi * 50 * t) * boom_amp * 2.0
    
    # Mix
    final_val = (lp_val * 0.8 + boom * 0.4) * amp * 25000
    
    # Soft Clipping
    final_val = max(-32700, min(32700, final_val))
    
    data.append(int(final_val))

# Write to WAV
with wave.open(output_path, 'w') as f:
    f.setnchannels(1) 
    f.setsampwidth(2) 
    f.setframerate(sample_rate)
    f.writeframes(struct.pack('<' + 'h' * len(data), *data))

print("Done!")
