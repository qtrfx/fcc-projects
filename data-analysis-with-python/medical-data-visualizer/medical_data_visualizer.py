import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# Import data
df = pd.read_csv('medical_examination.csv')

# Filter outliers
df = df.loc[
    (df['height'] >= df['height'].quantile(0.025)) &
    (df['height'] <= df['height'].quantile(0.975)) &
    (df['weight'] >= df['weight'].quantile(0.025)) &
    (df['weight'] <= df['weight'].quantile(0.975)) &
    (df['ap_lo'] <= df['ap_hi'])
    ]

# Normalize values
df['cholesterol'] = df['cholesterol'].apply(lambda x: 0 if x < 2 else 1)
df['gluc'] = df['gluc'].apply(lambda x: 0 if x < 2 else 1)

# Add 'overweight' column
df['overweight'] = (df['weight'] / ((df['height'] / 100) ** 2)).apply(lambda x: 0 if x <  25 else 1)

# Draw Categorical Plot
def draw_cat_plot():
    # Create DataFrame for cat plot using `pd.melt` using just the values from 'cholesterol', 'gluc', 'smoke', 'alco', 'active', and 'overweight'.
    df_cat = pd.melt(df,
                     id_vars='cardio',
                     value_vars=['cholesterol', 'gluc', 'smoke',
                                 'alco', 'active','overweight']
                    )



    # Group and reformat the data to split it by 'cardio'. Show the counts of each feature. You will have to rename one of the columns for the catplot to work correctly.
    df_cat = df_cat.groupby(by=['cardio', 'variable', 'value']).value_counts().to_frame().reset_index()

    # Rename count to total
    df_cat = df_cat.rename(columns={'count': 'total'})
    
    # Draw the catplot with 'sns.catplot()'
    catplot = sns.catplot(
        data=df_cat,
        x='variable',
        y='total',
        kind='bar',
        col='cardio',
        hue='value',
        height=10,
        aspect=1)


    # Get the figure for the output
    fig = catplot.figure


    # Do not modify the next two lines
    fig.savefig('catplot.png')
    return fig


# Draw Heat Map
def draw_heat_map():
    # Clean the data
    df_heat = df

    # Calculate the correlation matrix
    corr = df_heat.corr()

    # Generate a mask for the upper triangle
    mask = np.triu(np.ones_like(corr)).astype(np.bool_)
    
    # Set up the matplotlib figure
    fig, ax = plt.subplots(figsize=(14,11))
    
    # Draw the heatmap with 'sns.heatmap()'

    sns.heatmap(data=corr,
                annot=True,
                mask=mask,
                ax=ax,
                fmt=".1f",
                linewidth=0.5,
                square=True,
                cmap='viridis',
                cbar_kws={"shrink": 0.5})

    plt.yticks(rotation=0) 
    # Do not modify the next two lines
    fig.savefig('heatmap.png')
    return fig
