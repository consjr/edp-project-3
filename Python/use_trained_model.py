import pandas as pd
import pickle

# Load the large dataset
df_large = pd.read_csv("troop_movements10m.csv")

# Clean the data
df_large['unit_type'].replace('invalid_unit', 'unknown', inplace=True)
df_large[['location_x', 'location_y']] = df_large[['location_x', 'location_y']].fillna(method='ffill')

# Save cleaned data to Parquet
df_large.to_parquet('troop_movements10m.parquet', engine='fastparquet')

# Load the pickled model
with open("trained_model.pkl", "rb") as f:
    loaded_model = pickle.load(f)

# Load the Parquet file
df_large = pd.read_parquet('troop_movements10m.parquet')

# Encode categorical features
df_large_encoded = pd.get_dummies(df_large, columns=['unit_type', 'homeworld'])

# Ensure the columns match between training and prediction datasets
missing_cols = set(X.columns) - set(df_large_encoded.columns)
for c in missing_cols:
    df_large_encoded[c] = 0

df_large_encoded = df_large_encoded[X.columns]

# Make predictions
predictions = loaded_model.predict(df_large_encoded)

# Add predictions to the DataFrame
df_large['predictions'] = predictions
print(df_large.head())
