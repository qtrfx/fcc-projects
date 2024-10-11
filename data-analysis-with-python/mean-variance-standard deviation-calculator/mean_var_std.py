import numpy as np

def calculate(list):
    if len(list) != 9:
        raise ValueError('List must contain nine numbers.')

    numberMatrix = np.array(list).reshape(3,3)

    meanPerRow = numberMatrix.mean(axis=0).tolist()
    meanPerColumn = numberMatrix.mean(axis=1).tolist()
    meanFlat = numberMatrix.mean().tolist()
    
    mean = [meanPerRow, meanPerColumn, meanFlat]

    varPerRow = numberMatrix.var(axis=0).tolist()
    varPerColumn = numberMatrix.var(axis=1).tolist()
    varFlat = numberMatrix.var().tolist()
    variance = [varPerRow, varPerColumn, varFlat]

    stdPerRow = numberMatrix.std(axis=0).tolist()
    stdPerCol = numberMatrix.std(axis=1).tolist()
    stdFlat = numberMatrix.std()
    std = [stdPerRow, stdPerCol, stdFlat]

    maxPerRow = numberMatrix.max(axis=0).tolist()
    maxPerCol = numberMatrix.max(axis=1).tolist()
    maxFlat = numberMatrix.max().tolist()
    max = [maxPerRow, maxPerCol, maxFlat]

    minPerRow = numberMatrix.min(axis=0).tolist()
    minPerCol = numberMatrix.min(axis=1).tolist()
    minFlat = numberMatrix.min().tolist()
    min = [minPerRow, minPerCol, minFlat]

    sumPerRow = numberMatrix.sum(axis=0).tolist()
    sumPerCol = numberMatrix.sum(axis=1).tolist()
    sumFlat = numberMatrix.sum().tolist()

    sumList = [sumPerRow, sumPerCol, sumFlat]
    
    
    calculations = {
        "mean": mean,
        "variance": variance,
        "standard deviation": std,
        "max": max,
        "min": min,
        "sum": sumList
    }

    return calculations