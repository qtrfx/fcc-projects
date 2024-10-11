# Small function to capitalise words
def capitalize(word) :
  word = word[0:1].upper() + word[1:]
  return word
# Function to compose a return string  
def composeString(hours, minutes, amPm, days, weekday=None) :
  result = None
  # Checks if weekday was passed and composes accordingly
  if weekday is not None :
    result = '{}:{} {}, {}'.format(hours, minutes, amPm, weekday)
  else :
    result = '{}:{} {}'.format(hours, minutes, amPm)
  # Append days variable if it isn't 0
  if days != 0 :
    result = result + ' ' + days
  return result

def add_time(start, duration, dayOfTheWeek=''):
  lowerCaseDay = dayOfTheWeek.lower()
  weekdayIndex = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  resultWeekday = None
  
  # Check if a weekday was passed as an argument and is valid
  if lowerCaseDay in weekdayIndex :
    # Get the index of the passed weekday
    indexOfDay = weekdayIndex.index(lowerCaseDay)
    # Alter the weekdayIndex so it starts from the passed weekday and ends on the day before it
    weekdayIndex = weekdayIndex[indexOfDay:] + weekdayIndex[0: indexOfDay]

  # Split start time  string and get hours, minutes and AM/PM out of it
  splitStartTime = start.split(' ')
  startHours = splitStartTime[0].split(':')[0]
  startMinutes = splitStartTime[0].split(':')[1]
  amPm = splitStartTime[1]

  # Check for AM/PM and convert to 24 hour model to make calculations easier
  if amPm == 'AM' :
    # Convert the 12 to 0 in the case it is AM
    if startHours == '12' :
      startHours = '0';
  else :
    # Keep starthours at 12 if its PM
    if startHours == '12':
      startHours = '12'
    else:
    # Add +12 for the 24 hour clock if start time is PM
      startHours = int(startHours) + 12

  # Split duration string and get hours and minutes out of it
  splitDuration = duration.split(':')
  durationHours = int(splitDuration[0])
  durationMinutes = int(splitDuration[1])

  # Add an hour to the duration hours if the sum of the starting minutes + duration minutes is bigger than 59
  if (durationMinutes + int(startMinutes)) > 59 :
    durationHours = durationHours + 1
    # Result minutes will be start + durationminutes - 60 since we added an extra hour to duration hours
    resultMinutes = int(startMinutes) + durationMinutes - 60;
  else :
    # Else the sum of start + durationminutes will be our result minutes
    resultMinutes = int(startMinutes) + durationMinutes

  # Calucate the hours by getting the remainder of 24 of the sum of start + durationhours
  resultHours = (int(startHours) + int(durationHours)) % 24
  # Calculate the amount of days we jumped ahead by dividing by 24 and giving us an integer back
  resultDays = int((int(startHours) + int(durationHours)) / 24)

  # Check if user passed a valid weekday again
  if lowerCaseDay in weekdayIndex :
    # Find the weekday we end up at and capitalize it by using the resultDays variable and a remainder of 7
    resultWeekday = capitalize(weekdayIndex[resultDays % 7])
    
  # Check if a days string will need to be added
  if resultDays >= 1 :
    # Special rule, if its only one day ahead, use next day instead of a number
    if resultDays == 1 :
      resultDays = '(next day)'
    else :
      # Compose a string that'll read n days later if its more than one day
      resultDays = '(' + str(resultDays) + ' days later)'

  # Check if the resulting hours fall into AM or PM to convert back to the 12 hour system
  if resultHours < 12 :
    resultAmPm = 'AM'
  else :
    resultAmPm = 'PM'
  # Converting logic to the 12 hour system
  if resultHours > 12 :
    resultHours = resultHours - 12
  if resultHours == 0 :
    resultHours = 12
  # Add a zero if minutes are less than 10
  if resultMinutes < 10 :
    resultMinutes = '0' + str(resultMinutes)
  # Return the composed string after passing all the arguments to the function
  return composeString(resultHours, resultMinutes, resultAmPm, resultDays, resultWeekday)