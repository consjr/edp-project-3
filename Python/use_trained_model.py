import pandas as pd
import pickle

# Load the large dataset
df_large = pd.read_csv("troop_movements10m.csv")

# Clean the data
df_large['unit_type'] = df_large['unit_type'].replace('invalid_unit', 'unknown')
df_large[['location_x', 'location_y']] = df_large[['location_x', 'location_y']].ffill()

# Save cleaned data to Parquet using pyarrow
df_large.to_parquet('troop_movements10m.parquet', engine='pyarrow')

# Load the pickled model
with open("trained_model.pkl", "rb") as f:
    loaded_model = pickle.load(f)

# Load the Parquet file using pyarrow
df_large = pd.read_parquet('troop_movements10m.parquet', engine='pyarrow')

# Encode categorical features
df_large_encoded = pd.get_dummies(df_large, columns=['unit_type', 'homeworld'])

# Load the training data to get the correct columns
df_train = pd.read_csv("troop_movements.csv")
df_train_encoded = pd.get_dummies(df_train, columns=['unit_type', 'homeworld'])

# Drop columns that were not used during training
unused_columns = ['timestamp', 'unit_id', 'empire_or_resistance']
df_large_encoded.drop(columns=unused_columns, inplace=True, errors='ignore')

# Ensure all columns from the training set are present in the prediction set
missing_cols = set(df_train_encoded.columns) - set(df_large_encoded.columns)
for c in missing_cols:
    df_large_encoded[c] = 0

# Remove any extra columns that were not in the training set
extra_cols = set(df_large_encoded.columns) - set(df_train_encoded.columns)
df_large_encoded.drop(columns=extra_cols, inplace=True)

# Ensure the columns are in the same order as the training set
df_large_encoded = df_large_encoded[[col for col in df_train_encoded.columns if col not in unused_columns]]

# Make predictions
predictions = loaded_model.predict(df_large_encoded)

# Add predictions to the DataFrame
df_large['predictions'] = predictions
print(df_large.head())
