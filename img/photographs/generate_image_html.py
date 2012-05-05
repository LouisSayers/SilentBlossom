import sys, os

def this_files_directory(file):
  this_files_location = os.path.realpath(file)        
  this_files_directory = this_files_location.rpartition('/')
  return this_files_directory[0] + '/'

def is_an_image(image_name):
  for extension in ['jpg', 'jpeg', 'png', 'gif']:
    if image_name.endswith(extension):
      return True
  return False

def print_image_html(gallery, file_name, is_active=False):
  active = "active" if is_active else ""
  if is_an_image(file_name):
    print """
          <div class="imageThumbnail {active}">
            <img src="img/photographs/{gallery_type}/thumbnails/{file_name}"
             data-image-src="img/photographs/{gallery_type}/upload/{file_name}"
             alt="This is an image..."/>
          </div>""".format(active=active, gallery_type=gallery, file_name=file_name)
 


if len(sys.argv) < 2:
  print "you have to supply the relative folder to look in!"
  sys.exit()

image_dir = this_files_directory(__file__) + sys.argv[1]
gallery = sys.argv[1].partition('/')[0]

files_in_dir = os.listdir(image_dir)

print_image_html(gallery, files_in_dir.pop(0), True)

for file_name in files_in_dir:
    print_image_html(gallery, file_name)
