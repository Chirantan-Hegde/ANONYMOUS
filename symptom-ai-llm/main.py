#!/usr/bin/env python3
from llm_utils import SymptomMatcher
import argparse
import sys

def display_banner():
    print("""
   _____                       __   _____ 
  / ___/____ ___  ____  ____ _/ /  / ___/ 
  \__ \/ __ `__ \/ __ \/ __ `/ /   \__ \ 
 ___/ / / / / / / /_/ / /_/ / /   ___/ / 
/____/_/ /_/ /_/ .___/\__,_/_/   /____/  
              /_/                         
""")
    print("🔍 Medical Symptom Analysis System\n")

def main():
    display_banner()
    
    parser = argparse.ArgumentParser(description="Symptom Analysis System")
    parser.add_argument('-s', '--symptoms', nargs='+', help='List of symptoms')
    parser.add_argument('-f', '--file', help='File containing symptoms')
    parser.add_argument('-t', '--threshold', type=float, default=0.4, help='Match threshold (0.1-1.0)')
    
    args = parser.parse_args()
    
    try:
        matcher = SymptomMatcher('data/symptoms_data.csv')
        symptoms = args.symptoms or []
        
        if args.file:
            try:
                with open(args.file, 'r') as f:
                    symptoms.extend([line.strip() for line in f if line.strip()])
            except FileNotFoundError:
                print("Error: File not found")
                return
        
        if not symptoms:
            print("\nEnter symptoms (one per line, blank to finish):")
            while True:
                symptom = input().strip()
                if not symptom:
                    if symptoms:
                        break
                    continue
                symptoms.append(symptom)
        
        results = matcher.find_matches(symptoms, args.threshold)
        
        if not results:
            print("No matches found. Try different symptoms.")
            return
            
        print("\nTop Matches:")
        for idx, result in enumerate(results[:3], 1):
            print(f"\n{idx}. {result['disease']} ({result['match_percent']}% match)")
            print(f"  Specialist: {result['specialist']}")
            print(f"  Symptoms: {result['symptoms']}")
            print(f"  Treatments: {result['treatments']}")
            print(f"  Medicines: {result['medicines']}")
            print(f"  Side Effects: {result['side_effects']}")
            
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()