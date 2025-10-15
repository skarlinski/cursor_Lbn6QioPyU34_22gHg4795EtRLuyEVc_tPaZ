from flask import Blueprint, request, jsonify, send_file
from io import BytesIO

api_blueprint = Blueprint('api', __name__)

# In-memory storage for custom statuses
custom_statuses = {}


@api_blueprint.route('/statuses', methods=['POST'])
def create_status():
    """Upload an image with a status code"""
    status = request.form.get('status')
    image = request.files.get('image')
    
    if not image or not status:
        return 'Missing status or image.', 400
    
    # Store the image data in memory
    custom_statuses[status] = {
        'buffer': image.read(),
        'mimetype': image.mimetype
    }
    
    response = jsonify({
        'status': status,
        'message': 'Status cat created successfully.'
    })
    response.headers['Cache-Control'] = 'no-store'
    return response, 201


@api_blueprint.route('/statuses', methods=['GET'])
def get_statuses():
    """Get list of all custom statuses"""
    response = jsonify(list(custom_statuses.keys()))
    response.headers['Cache-Control'] = 'no-store'
    return response


@api_blueprint.route('/images/<status>', methods=['GET'])
def get_image(status):
    """Get the image for a specific status"""
    image = custom_statuses.get(status)
    
    if not image:
        return 'Not found.', 404
    
    # Create a BytesIO object from the buffer
    image_io = BytesIO(image['buffer'])
    image_io.seek(0)
    
    response = send_file(
        image_io,
        mimetype=image['mimetype']
    )
    response.headers['Cache-Control'] = 'no-store'
    return response
