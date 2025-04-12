import pandas as pd
import os

def create_sample_data():
    data = {
        'DISEASE': ['Common Cold', 'Influenza', 'Migraine', 'COVID-19'],
        'SPECIALIST': ['General Practitioner', 'General Practitioner', 'Neurologist', 'Infectious Disease'],
        'SYMPTOMS': [
            'fever,cough,headache,runny nose',
            'fever,muscle aches,fatigue,cough',
            'severe headache,nausea,sensitivity to light',
            'fever,cough,shortness of breath,fatigue'
        ],
        'TREATMENTS': [
            'rest,fluids,over-the-counter medication',
            'rest,antiviral medication,fluids',
            'pain relievers,rest in dark room',
            'supportive care,oxygen therapy'
        ],
        'MEDICINES': [
            'paracetamol,ibuprofen',
            'oseltamivir,paracetamol',
            'sumatriptan,ibuprofen',
            'remdesivir,dexamethasone'
        ],
        'SIDE EFFECTS(from the medicine)': [
            'drowsiness,stomach irritation',
            'nausea,dizziness',
            'dizziness,muscle weakness',
            'nausea,liver issues'
        ],
        'COLOR CODE': ['#FFC107', '#8A2BE2', '#FF7F50', '#708090']
    }
    
    os.makedirs('data', exist_ok=True)
    df = pd.DataFrame(data)
    df.to_csv('data/symptoms_data.csv', index=False)
    print("Sample data created at 'data/symptoms_data.csv'")

if __name__ == "__main__":
    create_sample_data()