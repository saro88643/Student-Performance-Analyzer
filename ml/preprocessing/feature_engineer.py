import pandas as pd
import numpy as np

def engineer_features(df):

    df = df.copy()
    
    # 1. Academic index
    if 'internal_marks' in df.columns and 'exam_score' in df.columns:
        df['academic_index'] = (df['internal_marks'] * 0.4 + df['exam_score'] * 0.6)
        
    # 2. Activity score index
    if 'activity_count' in df.columns and 'certificate_count' in df.columns:
        df['co_curricular_index'] = (df['activity_count'] * 2 + df['certificate_count'] * 3)
        
    # 3. Behavior balance score
    if 'positive_review_count' in df.columns and 'negative_review_count' in df.columns:
        df['behavior_balance'] = (df['positive_review_count'] * 5 - df['negative_review_count'] * 10)
        
    # 4. Target composite performance score if not already present
    if 'overall_score' not in df.columns and 'internal_marks' in df.columns:
        df['overall_score'] = (
            df['internal_marks'] * 0.35 +
            df['exam_score'] * 0.35 +
            df['attendance_percentage'] * 0.20 +
            df['certificate_count'] * 1.5 +
            df['positive_review_count'] * 1.0 -
            df['negative_review_count'] * 2.5
        ).clip(30, 99)
        
    return df
