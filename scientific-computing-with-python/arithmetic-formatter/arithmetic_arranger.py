import re

# Function to validate if the operands are valid numbers
def validateNumbers(firstNumber, secondNumber) :
  if re.search('^[0-9]+$',firstNumber) and re.search('^[0-9]+$',secondNumber) :
      return True
  return False
# Function to validate if the operands are valid in length (maximum of 4)
def validateLength(firstNumber, secondNumber) :
  if len(firstNumber) < 5 and len(secondNumber) < 5:
    return True
  return False;


def arithmetic_arranger(problems, wantResult=False):
  # Return an error if to many problems are passed
  if len(problems) > 5 :
    return 'Error: Too many problems.'
  # Initialise empty lines to be filled later    
  firstLine = ''
  secondLine = ''
  thirdLine = ''
  fourthLine = ''
  # Add a count to add 4 spaces for every additional problem after the first
  count = 0
    
  for problem in problems :
    # Check if spaces need to be added
    if count > 0 :
      firstLine = firstLine + ' ' * 4
      secondLine = secondLine + ' ' * 4
      thirdLine = thirdLine + ' ' * 4
      fourthLine = fourthLine + ' ' * 4
      
    count = count + 1
    # Split the problem into its operands and operator
    try :
      problem = problem.split(' ')
      firstOperand = problem[0]
      operator = problem[1]
      secondOperand = problem[2]
    except :
      return 'Error: Invalid Syntax (Missing Spaces between operator)'
    # Check for valid numbers
    if validateNumbers(firstOperand, secondOperand) is False :
      return 'Error: Numbers must only contain digits.'
    # Check for valid operator  
    if re.search('^[^\+\-]$', operator) :
      return "Error: Operator must be '+' or '-'."
    # Check for valid length
    if validateLength(firstOperand, secondOperand) is False :
      return "Error: Numbers cannot be more than four digits."

    # Find the length of the longer number and add 2 (one for a space and one for the operator)
    formatLength = len(max(problem, key=len)) + 2
    # First line gets filled with white space up to the point where the first operand will fill the formatLength
    firstLine = firstLine + ' ' * (formatLength - len(firstOperand)) + firstOperand
    # Same as first line but -1 so there's space for the operator
    secondLine = secondLine + operator + ' ' * (formatLength - len(secondOperand) - 1) + secondOperand
    # Add seperator - according to format length
    thirdLine = thirdLine + '-' * formatLength

    # Check if user wants the result of the problems
    if wantResult :
      # Check if operator is + or - and calculate accordingly
      if operator == '+' :
        result = int(firstOperand) + int(secondOperand)
      else:
        result = int(firstOperand) - int(secondOperand)
      # Add results to the fourth line
      fourthLine = fourthLine + ' ' * (formatLength - len(str(result))) + str(result)
        

  # Compose the return string by concatenating all the lines together with newlines
  arranged_problems = firstLine + '\n' + secondLine + '\n' + thirdLine
  # If user wants result, add the result line
  if wantResult :
    arranged_problems = arranged_problems + '\n' + fourthLine

  return arranged_problems
    
   
      
      

  
   # return arranged_problems
