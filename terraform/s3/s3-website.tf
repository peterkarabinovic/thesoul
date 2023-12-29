provider "aws" {
  region = "eu-central-1"
  profile = "personal"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "the-soul" 
}

# For Medusa S3 plugin we need ACLs enabled
resource "aws_s3_bucket_ownership_controls" "acl-enabled" {
  bucket = aws_s3_bucket.bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}


resource "aws_s3_bucket_public_access_block" "bucket" {
  bucket = aws_s3_bucket.bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "bucket-policy" {
  depends_on = [ aws_s3_bucket_public_access_block.bucket ]
  bucket = aws_s3_bucket.bucket.id
  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "PublicReadGetObject",
          "Effect" : "Allow",
          "Principal" : "*",
          "Action" : "s3:GetObject",
          "Resource" : "arn:aws:s3:::${aws_s3_bucket.bucket.id}/*"
        }
      ]
    }
  )
}	

resource "aws_s3_bucket_website_configuration" "bucket" {
  bucket = aws_s3_bucket.bucket.id

  index_document {
    suffix = "index.html"
  }
}

# locals {
#   mime_types = {
#     ".html" : "text/html",
#     ".css" : "text/css",
#     ".js" : "text/javascript",
#     ".jpg": "image/jpeg",
#   }
# }

# resource "aws_s3_object" "index_html" {
#   bucket = aws_s3_bucket.bucket.id
#   key    = "index.html"
#   source = "${path.module}/../src/index.html"
#   content_type = "text/html"
# }

# resource "aws_s3_object" "global_css" {
#   bucket = aws_s3_bucket.bucket.id
#   key    = "dist/global.css"
#   source = "${path.module}/../dist/global.css"
#   content_type = "text/css"
# }

# resource "aws_s3_object" "workshop_jpg" {
#   bucket = aws_s3_bucket.bucket.id
#   key    = "img/workshop.jpg"
#   source = "${path.module}/../img/workshop.jpg"
#   content_type = "image/jpeg"
# }

# resource "aws_s3_object" "logo_png" {
#   bucket = aws_s3_bucket.bucket.id
#   key    = "img/logo.png"
#   source = "${path.module}/../img/logo.png"
#   content_type = "image/png"
# }

output "website_url" {
  value = "http://${aws_s3_bucket_website_configuration.bucket.website_endpoint}"
}