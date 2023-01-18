
# DataloopAI
This is a Dataloop AI interview assignment


**Testcase #1 BoundingBoxOK (implemented)** -

**Description:** This test generates a bounding box annotaion on an existing image in a dataset, the size of the annotaion is half the size of the image and it's located in the center of the original image
**Test Steps**
1. Login with user from .env file
2. Enter studio
3. Delete previous annotaions
4. Draw the bounding box as follows: ½ the height and ½ the width of the image, it should start from ¼ from the left and ¼ from the top (middle of the image)
5. Verify the size of the annotation
6. Save

**Testcase #2 BoundingBoxMultiple**

**Description:** This test verifies that multiple bounding box type annotation are available and are in the right size.

**Test Steps**
1. Login with user from .env file
2. Enter studio
3. Delete previous annotations
4. Draw a bounding box as follows: ¼ the height and ¼ the width of the image, it should start from ¼ from the left and ¼ from the top 
5. Draw a bounding box as follows: ¼ the height and ¼ the width of the image, it should start from ½ from the left and ½ from the top - adjacent to the first box
6. Verify the size of the annotations
7. Save

**Testcase #3 BoundingBoxOutOfBounds**

**Description:** This test verifies that a bounding box that is configured out of bounds of the image, gives the correct warning message

**Test Steps**
1. Login with user from .env file
2. Enter studio
3. Delete previous annotations
4. Draw a bounding box that is out of bounds of the image
6. Verify the warning message
7. Save
