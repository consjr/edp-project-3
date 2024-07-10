import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
import pickle

# Load the data
df = pd.read_csv("troop_movements.csv")

# Data Exploration
# Count empire vs resistance
empire_resistance_count = df['empire_or_resistance'].value_counts()
print(empire_resistance_count)

# Count by homeworld
homeworld_count = df['homeworld'].value_counts()
print(homeworld_count)

# Count by unit type
unit_type_count = df['unit_type'].value_counts()
print(unit_type_count)

# Engineer a new feature 'is_resistance'
df['is_resistance'] = df['empire_or_resistance'] == 'resistance'
print(df.head())

# Visualize the data
sns.countplot(data=df, x='empire_or_resistance')
plt.title('Character Count by Empire or Resistance')
plt.show()

# Convert categorical features to numeric
df_encoded = pd.get_dummies(df, columns=['unit_type', 'homeworld'])

# Define features and target
X = df_encoded.drop(columns=['timestamp', 'unit_id', 'empire_or_resistance', 'is_resistance'])
y = df_encoded['is_resistance']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")

# Save the model
with open("trained_model.pkl", "wb") as f:
    pickle.dump(model, f)

# Get feature importances
importances = model.feature_importances_
feature_importances = pd.DataFrame({'Feature': X.columns, 'Importance': importances})
feature_importances = feature_importances.sort_values(by='Importance', ascending=False)

# Plot feature importances
plt.figure(figsize=(10, 8))
sns.barplot(data=feature_importances, x='Importance', y='Feature')
plt.title('Feature Importances')
plt.show()
