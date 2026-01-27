import wave
import random
import struct
import math

# Output file path
output_path = r"d:\trae_projects\情绪熔炉2\public\audio\fire_burning.wav"

# Audio parameters
duration = 10.0  # seconds
sample_rate = 44100
num_samples = int(duration * sample_rate)

# Generate crackling fire sound
# Fire sound is a mix of:
# 1. Low frequency rumble (brown/pink noise)
# 2. Random pops/clicks (crackles)

data = []
last_val = 0

print(f"Generating {duration}s of fire sound to {output_path}...")

for i in range(num_samples):
    # 1. Rumble (Brown noise - random walk)
    # Scale random step to control volume of rumble
    step = random.uniform(-1, 1) * 500 
    val = last_val + step
    
    # Dampen/Center to prevent drifting too far
    val = val * 0.95
    last_val = val
    
    # 2. Crackle (Random high amplitude spikes)
    # Low probability of a pop
    if random.random() < 0.0005: # 0.05% chance per sample ~ 22 pops per second
        pop_vol = random.uniform(5000, 15000)
        # Create a tiny burst for the pop
        val += pop_vol * (1 if random.random() > 0.5 else -1)
    
    # Clipping
    val = max(-32767, min(32767, val))
    
    data.append(int(val))

# Write to WAV file
with wave.open(output_path, 'w') as f:
    f.setnchannels(1) # Mono
    f.setsampwidth(2) # 2 bytes (16 bit)
    f.setframerate(sample_rate)
    f.writeframes(struct.pack('<' + 'h' * len(data), *data))

print("Done!")
