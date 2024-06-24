# Generated by Django 5.0.4 on 2024-06-17 07:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0024_alter_reservation_company_visible_mail'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reservation',
            name='item',
        ),
        migrations.AddField(
            model_name='reservation',
            name='item_id',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='reservation',
            name='item_title',
            field=models.CharField(default=1, max_length=255),
        ),
    ]