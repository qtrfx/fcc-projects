import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()

# Import data (Make sure to parse dates. Consider setting index column to 'date'.)
df = pd.read_csv('fcc-forum-pageviews.csv',
                 parse_dates=True,
                 index_col='date'
                
                )

# Clean data
df = df.loc[(df['value'] >= df['value'].quantile(0.025)) &
            (df['value'] <= df['value'].quantile(0.975))]


def draw_line_plot():
    # Draw line plot
    fig, ax = plt.subplots(figsize=(16, 5))
    
    ax.plot(df, color='red')
    ax.set_xlabel('Date')
    ax.set_ylabel('Page Views')
    ax.set_title('Daily freeCodeCamp Forum Page Views 5/2016-12/2019')




    # Save image and return fig (don't change this part)
    fig.savefig('line_plot.png')
    return fig

def draw_bar_plot():
    # Copy and modify data for monthly bar plot
    df_bar = df.copy()
    df_bar = df_bar.reset_index()
    df_bar['year'] = [d.year for d in df_bar.date]
    df_bar['month'] = [d.strftime('%B') for d in df_bar.date]

    # Draw bar plot
    
    monthOrder = ['January', 
                  'February', 
                  'March', 
                  'April', 
                  'May', 
                  'June', 
                  'July', 
                  'August', 
                  'September', 
                  'October', 
                  'November', 
                  'December']
    
    catplot = sns.catplot(
        data=df_bar, kind='bar',
        x='year', 
        y='value', 
        hue='month', 
        errorbar=None, 
        hue_order=monthOrder, 
        legend_out=False, 
        height=10, 
        aspect=1, 
        palette='tab10')
    

    plt.legend(loc='upper left', title='Months')
    sns.despine(top=False, right=False)
    catplot.set_axis_labels('Years', 'Average Page Views')

    fig = catplot.figure




    # Save image and return fig (don't change this part)
    fig.savefig('bar_plot.png')
    return fig

def draw_box_plot():
    # Prepare data for box plots (this part is done!)
    df_box = df.copy()
    df_box.reset_index(inplace=True)
    df_box['year'] = [d.year for d in df_box.date]
    df_box['month'] = [d.strftime('%b') for d in df_box.date]

    # Draw box plots (using Seaborn)
    fig, (ax1, ax2) = plt.subplots(ncols=2, figsize=(20,6))
    
    sns.boxplot(df_box,
                x='year',
                y='value',
                ax=ax1,
                fliersize=0
               )
    
    ax1.set_xlabel('Year')
    ax1.set_ylabel('Page Views')
    ax1.set_title('Year-wise Box Plot (Trend)')

    sns.boxplot(df_box,
                x='month',
                y='value',
                ax=ax2,
                fliersize=0,
                order=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
               )
    
    ax2.set_xlabel('Month')
    ax2.set_ylabel('Page Views')
    ax2.set_title('Month-wise Box Plot (Seasonality)')




    # Save image and return fig (don't change this part)
    fig.savefig('box_plot.png')
    return fig
