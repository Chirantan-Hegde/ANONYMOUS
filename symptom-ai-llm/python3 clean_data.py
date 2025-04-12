import pandas as pd

# Load your CSV
df = pd.read_csv("data/symptoms_data.csv")

# Strip whitespace and convert everything to proper case
df.columns = [col.strip() for col in df.columns]

for col in ['DISEASE', 'SPECIALIST', 'TREATMENTS', 'MEDICINES', 'COLOR CODE']:
    if col in df.columns:
        df[col] = df[col].astype(str).str.strip().str.title()

# Normalize symptoms and side effects to lowercase comma-separated values
for col in ['SYMPTOMS', 'SIDE EFFECTS(from the medicine)']:
    if col in df.columns:
        df[col] = df[col].astype(str).str.strip().str.lower()

# Save to new file
df.to_csv("data/symptoms_data_cleaned.csv", index=False)
print("✅ Data cleaned and saved to data/symptoms_data_cleaned.csv")
