import pandas as pd
from difflib import SequenceMatcher
from collections import defaultdict
import os

class SymptomMatcher:
    def __init__(self, data_path):
        try:
            self.df = pd.read_csv(data_path)
            self.df['SYMPTOMS'] = self.df['SYMPTOMS'].apply(
                lambda x: [s.strip().lower() for s in str(x).split(',')]
            )
            self.symptom_index = self._build_symptom_index()
        except Exception as e:
            raise Exception(f"Failed to load data: {str(e)}")

    def _build_symptom_index(self):
        index = defaultdict(list)
        for _, row in self.df.iterrows():
            for symptom in row['SYMPTOMS']:
                index[symptom].append(row['DISEASE'])
        return index
    
    def _similarity(self, a, b):
        return SequenceMatcher(None, a.lower(), b.lower()).ratio()
    
    def find_matches(self, user_symptoms, threshold=0.4):
        if not user_symptoms:
            return []
            
        user_symptoms = [s.strip().lower() for s in user_symptoms if s.strip()]
        disease_scores = defaultdict(float)
        
        for symptom in user_symptoms:
            for known_symptom, diseases in self.symptom_index.items():
                if symptom == known_symptom:
                    for disease in diseases:
                        disease_scores[disease] += 1.0
                elif self._similarity(symptom, known_symptom) > 0.7:
                    for disease in diseases:
                        disease_scores[disease] += 0.5
        
        results = []
        for disease, score in disease_scores.items():
            match_percent = (score / len(user_symptoms)) * 100
            if match_percent >= threshold * 100:
                disease_data = self.df[self.df['DISEASE'] == disease].iloc[0]
                results.append({
                    'disease': disease,
                    'match_percent': round(match_percent, 1),
                    'specialist': disease_data['SPECIALIST'],
                    'symptoms': ', '.join(disease_data['SYMPTOMS']),
                    'treatments': disease_data['TREATMENTS'],
                    'medicines': disease_data['MEDICINES'],
                    'side_effects': disease_data['SIDE EFFECTS(from the medicine)']
                })
        
        return sorted(results, key=lambda x: x['match_percent'], reverse=True)